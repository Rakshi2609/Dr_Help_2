import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true, // Enable client-side usage
});

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const HEALTH_SYSTEM_PROMPT = `You are Dr. AI, a health assistant. Only answer health and medical questions. For non-health topics, say: "I only help with health questions. Please ask about health, symptoms, or medical topics." Keep responses helpful but brief.`;

export class GroqChatService {
  private static instance: GroqChatService;
  
  public static getInstance(): GroqChatService {
    if (!GroqChatService.instance) {
      GroqChatService.instance = new GroqChatService();
    }
    return GroqChatService.instance;
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      // Check if API key is configured
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!apiKey || apiKey === 'your_groq_api_key_here' || apiKey.trim() === '') {
        throw new Error('API key configuration error. Please check your Groq API key.\n\nSteps to fix:\n1. Get your API key from https://console.groq.com/keys\n2. Add it to frontend/.env.local as:\n   NEXT_PUBLIC_GROQ_API_KEY=your_actual_api_key\n3. Restart the development server');
      }

      console.log('🚀 Sending message to Groq API...', { messageCount: messages.length });
      
      // Filter and format messages for Groq API
      const formattedMessages = [
        { role: 'system' as const, content: HEALTH_SYSTEM_PROMPT },
        ...messages.slice(-5).map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }))
      ];

      console.log('📝 Formatted messages:', formattedMessages);

      const completion = await groq.chat.completions.create({
        messages: formattedMessages,
        model: 'llama-3.1-8b-instant', // Using currently supported Llama 3.1 model
        temperature: 0.7,
        max_tokens: 500, // Reduced max tokens for better reliability
        top_p: 0.9,
        stream: false,
      });

      console.log('✅ Groq API response received:', completion);

      const responseContent = completion.choices[0]?.message?.content;
      
      if (!responseContent) {
        console.error('❌ No content in Groq response');
        throw new Error('No response content received');
      }

      console.log('📤 Returning response:', responseContent);
      return responseContent;
      
    } catch (error) {
      console.error('❌ Groq API Error:', {
        error: error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        // Additional debugging info
        response: (error as any)?.response,
        status: (error as any)?.status,
        data: (error as any)?.response?.data
      });
      
      if (error instanceof Error) {
        if (error.message.includes('API key') || error.message.includes('401')) {
          throw new Error('API key configuration error. Please check your Groq API key.');
        }
        if (error.message.includes('rate limit') || error.message.includes('429')) {
          throw new Error('Rate limit exceeded. Please wait a moment before sending another message.');
        }
        if (error.message.includes('network')) {
          throw new Error('Network error. Please check your internet connection.');
        }
        if (error.message.includes('400')) {
          throw new Error('Invalid request. The model or parameters may not be supported.');
        }
      }
      
      throw new Error('Failed to get response from AI assistant. Please try again.');
    }
  }

  isHealthRelated(message: string): boolean {
    const healthKeywords = [
      'health', 'medical', 'doctor', 'symptom', 'pain', 'sick', 'disease',
      'medicine', 'treatment', 'diagnosis', 'wellness', 'fitness', 'nutrition',
      'mental health', 'anxiety', 'depression', 'therapy', 'hospital', 'clinic',
      'medication', 'supplement', 'exercise', 'diet', 'sleep', 'stress',
      'headache', 'fever', 'cough', 'allergy', 'injury', 'chronic', 'acute',
      'prevention', 'vaccine', 'immunity', 'infection', 'cancer', 'diabetes',
      'blood pressure', 'heart', 'lungs', 'liver', 'kidney', 'brain',
      'cold', 'flu', 'throat', 'nose', 'breathing', 'tired', 'fatigue',
      'nausea', 'vomit', 'stomach', 'abdomen', 'chest', 'back', 'neck',
      'muscle', 'joint', 'bone', 'skin', 'rash', 'wound', 'cut', 'burn',
      'bleeding', 'swelling', 'inflammation', 'infection', 'virus', 'bacteria',
      'pregnancy', 'birth', 'baby', 'child', 'elderly', 'age', 'aging',
      'vitamin', 'mineral', 'protein', 'carbs', 'calories', 'weight',
      'bmi', 'overweight', 'obesity', 'underweight', 'eating disorder',
      'food', 'hunger', 'thirst', 'energy', 'strength', 'weakness',
      'dizziness', 'vertigo', 'balance', 'coordination', 'memory',
      'concentration', 'mood', 'emotion', 'feeling', 'mental',
      'psychological', 'psychiatric', 'counseling', 'support'
    ];

    const lowerMessage = message.toLowerCase();
    
    // Check for exact keyword matches
    const hasHealthKeyword = healthKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Check for common health-related phrases
    const healthPhrases = [
      'feel sick', 'not feeling well', 'feeling bad', 'feeling tired',
      'hurts', 'ache', 'aches', 'sore', 'painful', 'discomfort',
      'ill', 'unwell', 'poorly', 'under the weather',
      'my body', 'my head', 'my stomach', 'my back', 'my chest',
      'how to', 'what should i', 'is it normal', 'should i see',
      'medical advice', 'health advice', 'feel better'
    ];
    
    const hasHealthPhrase = healthPhrases.some(phrase => lowerMessage.includes(phrase));
    
    return hasHealthKeyword || hasHealthPhrase;
  }
}

export const groqService = GroqChatService.getInstance();

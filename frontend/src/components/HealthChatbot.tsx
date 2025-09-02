'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { groqService, ChatMessage } from '@/lib/groq-service';
import { v4 as uuidv4 } from 'uuid';

interface HealthChatbotProps {
  className?: string;
}

export function HealthChatbot({ className }: HealthChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: '👋 Hello! I\'m Dr. AI, your health assistant. I\'m here to help with health-related questions, wellness advice, and medical information. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('health-chat-history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
        console.log('📚 Loaded chat history from localStorage');
      } catch (error) {
        console.error('❌ Error loading chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 1) { // Don't save just the initial message
      localStorage.setItem('health-chat-history', JSON.stringify(messages));
      console.log('💾 Saved chat history to localStorage');
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    console.log('📨 Sending user message:', inputMessage);
    
    // Check if the message is health-related
    if (!groqService.isHealthRelated(inputMessage)) {
      const nonHealthResponse: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: '🏥 I\'m specifically designed to help with health and medical questions. Please ask me about your health concerns, symptoms, wellness, fitness, nutrition, or any medical topics. How can I assist you with your health today?',
        timestamp: new Date(),
      };
      
      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content: inputMessage,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage, nonHealthResponse]);
      setInputMessage('');
      console.log('⚠️ Non-health related query redirected');
      return;
    }

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      console.log('🤖 Calling Groq service...');
      const response = await groqService.sendMessage([...messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      console.log('✅ Message sent and response received successfully');
      
    } catch (error) {
      console.error('❌ Error in handleSendMessage:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: '❌ I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const initialMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: '👋 Hello! I\'m Dr. AI, your health assistant. I\'m here to help with health-related questions, wellness advice, and medical information. How can I assist you today?',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    localStorage.removeItem('health-chat-history');
    console.log('🗑️ Chat history cleared');
  };

  return (
    <div className={`chatbot-container ${className}`}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            key="minimized"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="chatbot-minimized"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="chatbot-expanded glass"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border bg-primary/5 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Dr. AI</h3>
                  <p className="text-xs text-muted-foreground">Health Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-xs hover:bg-destructive/10 hover:text-destructive h-7 px-2"
                >
                  Clear
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-muted h-7 w-7 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 h-[320px] p-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted text-foreground p-3 rounded-2xl flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Dr. AI is thinking...</span>
                    </div>
                  </motion.div>
                )}
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-destructive/10 text-destructive p-3 rounded-2xl flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-3 border-t border-border flex-shrink-0">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your health..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 h-9 w-9 p-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                💡 Health & wellness questions only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

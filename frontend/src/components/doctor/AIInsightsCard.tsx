import { getAIDrivenInsights } from '@/ai/flows/ai-driven-insights-for-doctors'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

type AIInsightsCardProps = {
  patientId: string
}

export default async function AIInsightsCard({
  patientId,
}: AIInsightsCardProps) {
  let insightsData;
  
  try {
    insightsData = await getAIDrivenInsights({
      patientId: patientId,
      vitalsSummary: 'Heart rate elevated, temperature normal.',
      painScore: 8,
      alerts: ['High pain score reported', 'Medication due'],
    });
  } catch (error) {
    console.error('Failed to get AI insights:', error);
    // Fallback data in case of error
    insightsData = {
      insights: "Unable to generate AI insights at this time. Recommend reviewing patient's vital signs and pain score manually."
    };
  }

  return (
    <Card className="bg-secondary/50 dark:bg-secondary/20 border-primary/20">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lightbulb className="h-6 w-6" />
        </div>
        <div>
          <CardTitle>AI-Driven Insights</CardTitle>
          <CardDescription>
            Recommendations for patient {patientId}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed">
          {insightsData.insights}
        </p>
      </CardContent>
    </Card>
  )
}

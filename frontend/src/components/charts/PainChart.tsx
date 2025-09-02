'use client'

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'

// Default data for demonstration
const defaultData = [
  { date: '7 days ago', score: 3 },
  { date: '6 days ago', score: 4 },
  { date: '5 days ago', score: 2 },
  { date: '4 days ago', score: 5 },
  { date: '3 days ago', score: 4 },
  { date: '2 days ago', score: 6 },
  { date: 'Yesterday', score: 8 },
  { date: 'Today', score: 7 },
]

// Format date to a readable string
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
}

type PainRecord = {
  score: number;
  timestamp: string;
  notes?: string;
}

interface PainChartProps {
  painHistory?: PainRecord[];
  currentPainLevel?: number;
}

export default function PainChart({ painHistory, currentPainLevel }: PainChartProps) {
  const [chartData, setChartData] = useState(defaultData);
  
  useEffect(() => {
    // Check if pain history exists and has content
    if (painHistory && Array.isArray(painHistory) && painHistory.length > 0) {
      try {
        // Convert pain history to chart data
        const formattedData = painHistory
          .filter(record => record && record.timestamp && record.score !== undefined)
          .map(record => ({
            date: formatDate(record.timestamp),
            score: record.score
          }));
        
        // Add current pain level if provided
        if (currentPainLevel !== undefined) {
          formattedData.push({
            date: 'Current',
            score: currentPainLevel
          });
        }
        
        if (formattedData.length > 0) {
          setChartData(formattedData);
          return;
        }
      } catch (error) {
        console.error('Error processing pain history:', error);
      }
    }
    
    // If we got here, either there's no valid pain history or an error occurred
    // Create a default chart with the current pain level
    if (currentPainLevel !== undefined) {
      const defaultWithCurrent = [
        { date: '3 days ago', score: Math.max(0, currentPainLevel - 2) },
        { date: '2 days ago', score: Math.max(0, currentPainLevel - 1) },
        { date: 'Yesterday', score: currentPainLevel },
        { date: 'Today', score: currentPainLevel }
      ];
      setChartData(defaultWithCurrent);
    } else {
      // Use complete default data if no current pain level is available
      setChartData(defaultData);
    }
  }, [painHistory, currentPainLevel]);
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickMargin={10}
          />
          <YAxis
            domain={[0, 10]}
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickMargin={10}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Pain Score
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].value}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            strokeWidth={2}
            stroke="hsl(var(--primary))"
            dot={{
              r: 6,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

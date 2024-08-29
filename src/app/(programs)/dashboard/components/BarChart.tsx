'use client'

import { Area, AreaChart, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChartDataProps } from '../page'

interface BarChartProps {
  chartData: ChartDataProps[]
}

export const BarChartDashboard = ({ chartData }: BarChartProps) => {
  return (
    <ChartContainer
      config={{
        time: {
          color: 'black',
        },
      }}
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="mes" hide />
        <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
        <defs>
          <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="black" stopOpacity={0.8} />
            <stop offset="95%" stopColor="black" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="valor"
          type="natural"
          fill="url(#fillTime)"
          fillOpacity={0.4}
          stroke="black"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
          formatter={(value) => (
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              Gasto no mês:
              <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                {value.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })}
              </div>
            </div>
          )}
        />
      </AreaChart>
    </ChartContainer>
  )
}

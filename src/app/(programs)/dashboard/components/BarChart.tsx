'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ChartDataProps } from '../page'

interface BarChartProps {
  chartData: ChartDataProps[]
}

export const BarChartDashboard = ({ chartData }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData} style={{ fontSize: 12 }}>
        <XAxis dataKey="mes" tickLine={false} axisLine={false} dy={16} />
        <YAxis
          stroke="#888"
          width={80}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value: number) =>
            value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          }
        />

        <CartesianGrid className="stroke-muted" vertical={false} />
        <Tooltip />
        <Line type="linear" strokeWidth={2} dataKey="valor" />
      </LineChart>
    </ResponsiveContainer>
  )
}

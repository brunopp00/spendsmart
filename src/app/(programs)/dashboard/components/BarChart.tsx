'use client'

import { Bar } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js'
import { ChartDataProps } from '../page'

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
)

interface BarChartProps {
  chartData: ChartDataProps[]
}

export const BarChart = ({ chartData }: BarChartProps) => {
  return (
    <Bar
      options={{
        datasets: { bar: { borderRadius: 10 } },
      }}
      data={{
        labels: chartData.map(
          (item) => `${item.mes} R$(${item.valor.toLocaleString('pt-BR')})`,
        ),
        datasets: [
          {
            label: 'Valor',
            backgroundColor: ['#efefef', 'black'],
            data: chartData.map((item) => item.valor),
          },
        ],
      }}
    />
  )
}

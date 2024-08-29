import { useUserStore } from '@/store/user'
import { BarChartDashboard } from './components/BarChart'
import { prisma } from '@/lib/prisma'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface ChartDataProps {
  mes: string
  valor: number
}

export default async function Dashboard() {
  const {
    state: { user },
  } = await useUserStore.getState()

  const data = await prisma.expense.findMany({
    where: {
      userId: user?.id,
    },
  })

  const hoje = new Date()
  const dozeMesesAtras = new Date()
  dozeMesesAtras.setMonth(hoje.getMonth() - 12)

  const valoresPorMes: Record<string, number> = data.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acumulador: any, despesa) => {
      const dataDespesa = new Date(despesa.date)

      if (dataDespesa >= dozeMesesAtras && dataDespesa <= hoje) {
        const mes = dataDespesa.getMonth() + 1
        const ano = dataDespesa.getFullYear()

        if (!acumulador[`${mes}/${ano}`]) {
          acumulador[`${mes}/${ano}`] = 0
        }

        acumulador[`${mes}/${ano}`] += despesa.amount
      }

      return acumulador
    },
    {},
  )
  const mesesComGastos = Object.entries(valoresPorMes)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, valor]: [string, number]) => valor > 0)
    .map(([mesAno, valor]: [string, number]) => ({
      mes: mesAno,
      valor,
    }))

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl dark:text-white">Dashboard</h1>
        <hr />
      </div>
      <div className="grid grid-cols-4 gap-5 md:grid-cols-3">
        <Card className="col-span-1 min-w-full" x-chunk="charts-01-chunk-7">
          <CardHeader className="space-y-0 pb-0">
            <CardTitle className="flex items-baseline gap-1 text-4xl">
              <span className="text-xl font-normal">Gastos Mensais</span>
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Gastos mensais dos últimos 12 meses
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <BarChartDashboard chartData={mesesComGastos.reverse()} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

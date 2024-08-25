import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { useUserStore } from '@/store/user'
import { BarChartDashboard } from './components/BarChart'

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
      {mesesComGastos.length > 0 && (
        <div className="grid grid-cols-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">
                Gastos Mensais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartDashboard chartData={mesesComGastos.reverse()} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

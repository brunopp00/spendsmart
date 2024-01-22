import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { prisma } from '@/lib/prisma'
import { useUserStore } from '@/store/user'
import { format } from 'date-fns'
import { CreateRecurring } from './components/AddRecurring'
import { DeleteRecurring } from './components/DeleteRecurring'

export default async function Recurring() {
  const {
    state: { user },
  } = await useUserStore.getState()

  const lista = await prisma.recurringExpense.findMany({
    where: {
      userId: user?.id,
    },
  })

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-3xl dark:text-white">Recurring Expense</h1>
        <CreateRecurring />
      </div>
      <hr />
      <div>
        <ScrollArea className="h-[700px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Expire Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lista.map((item) => (
                <TableRow key={item.id} className="dark:text-white">
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {format(new Date(item.dtExpire), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    R$ {item.amount ? item.amount.toFixed(2) : null}
                  </TableCell>
                  <DeleteRecurring id={item.id} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

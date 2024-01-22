import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUserStore } from '@/store/user'
import { format } from 'date-fns'
import { FormCreateExpense } from './components/FormCreateExpense'
import { DeleteExpense } from './components/DeleteExpense'
import { prisma } from '@/lib/prisma'
import PDFPage from './pdf'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ImportRecurring } from './components/ImportRecurring'

export default async function ExpenseList() {
  const {
    state: { user },
  } = useUserStore.getState()

  const list = await prisma.expense.findMany({
    where: {
      userId: user?.id,
    },
  })

  const sumOfValues = list.reduce((acc, item) => {
    return acc + item.amount
  }, 0)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <h1 className="text-3xl dark:text-white">Expense List</h1>
        <div className="flex gap-3">
          <PDFPage data={list} />
          <ImportRecurring />
          <FormCreateExpense />
        </div>
      </div>
      <hr />
      <ScrollArea className="h-[650px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categories Names</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => (
              <TableRow key={item.id} className="dark:text-white">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{format(item.date, 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  R$ {item.amount ? item.amount.toFixed(2) : null}
                </TableCell>
                <DeleteExpense id={item.id} />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell />
              <TableCell>
                R$ {sumOfValues ? sumOfValues.toFixed(2) : '00.00'}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </div>
  )
}

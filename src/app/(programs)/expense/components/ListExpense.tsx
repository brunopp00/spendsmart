import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteExpense } from './DeleteExpense'

interface ListExpenseProps {
  list: {
    id: number
    name: string
    description: string | null
    date: Date
    amount: number
    createdAt: Date
    userId: number
  }[]
  sumOfValues: number
}

export const ListExpense = ({ list, sumOfValues }: ListExpenseProps) => {
  return (
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
              <TableCell>{item.date.toDateString()}</TableCell>
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
  )
}

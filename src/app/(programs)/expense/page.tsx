'use client'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUserStore } from '@/store/user'
import { format } from 'date-fns'
import { FormCreateExpense } from './components/FormCreateExpense'
import { DeleteExpense } from './components/DeleteExpense'
import { useCallback, useEffect, useState } from 'react'

interface ExpenseListProps {
  id: number
  name: string
  description: string
  amount: number
  date: string
}

export default function ExpenseList() {
  const {
    state: { user },
  } = useUserStore.getState()

  const [lista, setLista] = useState<ExpenseListProps[]>([])

  const getList = useCallback(() => {
    fetch('http://localhost:3001/expense/api', {
      body: JSON.stringify({
        userId: user?.id,
      }),
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLista(data)
      })
  }, [user?.id])

  useEffect(() => getList(), [getList])
  console.log(lista)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <h1 className="text-3xl dark:text-white">Expense List</h1>
        <Input className="w-64 bg-transparent dark:text-white" type="date" />
      </div>
      <hr />
      <div className="text-end">
        <FormCreateExpense getList={getList} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categories Names</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lista.map((item) => (
            <TableRow key={item.id} className="dark:text-white">
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{format(new Date(item.date), 'dd/MM/yyyy')}</TableCell>
              <TableCell>
                R$ {item.amount ? item.amount.toFixed(2) : null}
              </TableCell>
              <DeleteExpense getList={getList} id={item.id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

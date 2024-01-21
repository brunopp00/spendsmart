'use client'

import { TableCell } from '@/components/ui/table'
import { FaTrash } from 'react-icons/fa'
import { deleteExpense } from '../actions'
import { toast } from 'sonner'

interface DeleteExpenseProps {
  id: number
}

export const DeleteExpense = ({ id }: DeleteExpenseProps) => {
  const handleSubmit = (id: number) => {
    deleteExpense(id).then((res) => {
      if (res?.error) {
        toast.error(res.error, { duration: 5000 })
      } else {
        toast.success(res.message, { duration: 5000 })
      }
    })
  }
  return (
    <TableCell onClick={() => handleSubmit(id)}>
      <FaTrash title="Delete Expense" size={18} className="cursor-pointer" />
    </TableCell>
  )
}

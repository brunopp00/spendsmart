'use client'

import { TableCell } from '@/components/ui/table'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'
import { deleteRecurring } from '../actions'

interface DeleteExpenseProps {
  id: number
}

export const DeleteRecurring = ({ id }: DeleteExpenseProps) => {
  const handleSubmit = (id: number) => {
    deleteRecurring(id).then((res) => {
      if (res?.error) {
        toast.error(res.error, { duration: 5000 })
      } else {
        toast.success(res.message, { duration: 5000 })
      }
    })
  }
  return (
    <TableCell onClick={() => handleSubmit(id)}>
      <FaTrash title="Delete Recurring" size={18} className="cursor-pointer" />
    </TableCell>
  )
}

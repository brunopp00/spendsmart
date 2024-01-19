'use client'

import { TableCell } from '@/components/ui/table'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'

interface DeleteExpenseProps {
  id: number
  getList: () => void
}

export const DeleteExpense = ({ id, getList }: DeleteExpenseProps) => {
  const deleteExpense = async (id: number) => {
    fetch('/expense/api', {
      body: JSON.stringify({
        id,
      }),
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            duration: 5000,
          })
        } else {
          toast.success('Expense deleted successfully!', {
            duration: 5000,
          })
          getList()
        }
      })
  }

  return (
    <TableCell onClick={() => deleteExpense(id)}>
      <FaTrash title="Delete Expense" size={18} className="cursor-pointer" />
    </TableCell>
  )
}

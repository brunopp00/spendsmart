'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createdExpense } from '../actions'
import { toast } from 'sonner'
import { useUserStore } from '@/store/user'

export interface CreatedExpenseProps {
  name: string
  description: string
  amount: number
  date: string
  userId: number | undefined
}

export const FormCreateExpense = () => {
  const {
    state: { user },
  } = useUserStore()

  const { register, handleSubmit, reset } = useForm<CreatedExpenseProps>({
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      userId: user?.id,
    },
  })

  const submitForm: SubmitHandler<CreatedExpenseProps> = async (values) => {
    const obj = {
      ...values,
      userId: user?.id,
    }
    await createdExpense(obj).then((res) => {
      if (res?.error) {
        toast.error(res.error, { duration: 5000 })
      } else {
        reset()
        toast.success(res.message, { duration: 5000 })
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-32">Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new expense
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-subgrid gap-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <Label>Name</Label>
            <Input
              {...register('name', { required: true })}
              placeholder="Name"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input {...register('description')} placeholder="Description" />
          </div>
          <div>
            <Label>Amount</Label>
            <Input
              {...register('amount', { required: true })}
              placeholder="Amount"
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              {...register('date', { required: true })}
              type="date"
              placeholder="Date"
            />
          </div>
          <div className="text-end">
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

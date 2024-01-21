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
import { useState } from 'react'

export interface CreatedExpenseProps {
  name: string
  description: string
  amount: number
  date: string
}

export const FormCreateExpense = () => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit } = useForm<CreatedExpenseProps>({
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
    },
  })

  const user =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('userSpendSmart')
      : null

  const submitForm: SubmitHandler<CreatedExpenseProps> = async (values) => {
    await createdExpense(values, JSON.parse(user || '')).then((res) => {
      if (res?.error) {
        toast.error(res.error, { duration: 5000 })
      } else {
        setOpen(false)
        toast.success(res.message, { duration: 5000 })
      }
    })
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-32">
          Add Expense
        </Button>
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

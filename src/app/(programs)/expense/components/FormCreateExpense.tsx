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
import { toast } from 'sonner'

interface CreatedExpenseProps {
  name: string
  description: string
  amount: number
  date: string
}

interface FormCreateExpenseProps {
  getList: () => void
}

export const FormCreateExpense = ({ getList }: FormCreateExpenseProps) => {
  const { register, handleSubmit } = useForm<CreatedExpenseProps>({
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
    },
  })

  const user = window.localStorage.getItem('userSpendSmart')

  const createdExpense: SubmitHandler<CreatedExpenseProps> = async (values) => {
    fetch('/expense/api', {
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        amount: values.amount ? Number(values.amount) : 0,
        date: values.date ? new Date(values.date) : new Date(),
        userId: JSON.parse(user || '').id,
      }),
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            duration: 5000,
          })
        } else {
          toast.success('Expense created successfully!', {
            duration: 5000,
          })
          getList()
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
          onSubmit={handleSubmit(createdExpense)}
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

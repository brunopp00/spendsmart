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
import { createdRecurring } from '../actions'
import { useUserStore } from '@/store/user'

export interface RecurringExpenseProps {
  name: string
  description: string
  amount: number
  dtExpire: string
  userId: number | undefined
}

export const CreateRecurring = () => {
  const {
    state: { user },
  } = useUserStore()

  const { register, handleSubmit, reset } = useForm<RecurringExpenseProps>({
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      dtExpire: format(new Date(), 'yyyy-MM-dd'),
      userId: user?.id,
    },
  })

  const submitForm: SubmitHandler<RecurringExpenseProps> = async (values) => {
    const obj = {
      ...values,
      userId: user?.id,
    }
    await createdRecurring(obj).then((res) => {
      if (res.status) {
        reset()
        toast.success(res.message, { duration: 5000 })
      } else {
        toast.error(res.error, { duration: 5000 })
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-32">Add Recurring</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Recurring</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a recurring expense
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
            <Label>Expire Date</Label>
            <Input
              {...register('dtExpire', { required: true })}
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

'use server'

import { revalidatePath } from 'next/cache'
import { RecurringExpenseProps } from './components/AddRecurring'
import { prisma } from '@/lib/prisma'

export async function createdRecurring(values: RecurringExpenseProps) {
  try {
    await prisma.recurringExpense.create({
      data: {
        name: values.name,
        description: values.description,
        amount: values.amount ? Number(values.amount) : 0,
        dtExpire: values.dtExpire ? new Date(values.dtExpire) : new Date(),
        userId: values.userId || 0,
        added: false,
      },
    })
    revalidatePath('/recurring')
    return { message: 'Recurring created', status: true }
  } catch (error) {
    return { error: 'Something went wrong', status: false }
  }
}

export async function checkAdd(id: number) {
  try {
    await prisma.recurringExpense.update({
      where: { id },
      data: { added: true },
    })

    revalidatePath('/recurring')
    return { message: 'Recurring added', status: true }
  } catch (error) {
    return { error: 'Something went wrong', status: false }
  }
}

export async function deleteRecurring(id: number) {
  try {
    await prisma.recurringExpense.delete({
      where: { id },
    })
    revalidatePath('/recurring')
    return { message: 'Recurring deleted', status: true }
  } catch (error) {
    return { error: 'Something went wrong', status: false }
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import { CreatedExpenseProps } from './components/FormCreateExpense'
import { UserProps } from '@/types/user'
import { prisma } from '@/lib/prisma'

export async function createdExpense(
  values: CreatedExpenseProps,
  user: UserProps,
) {
  try {
    await prisma.expense.create({
      data: {
        name: values.name,
        description: values.description,
        amount: values.amount ? Number(values.amount) : 0,
        date: values.date ? new Date(values.date) : new Date(),
        userId: user?.id,
      },
    })
    revalidatePath('/expense')

    return { message: 'Expense created' }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

export async function deleteExpense(id: number) {
  try {
    await prisma.expense.delete({
      where: {
        id,
      },
    })
    revalidatePath('/expense')
    return { message: 'Expense deleted' }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

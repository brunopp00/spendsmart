'use server'

import { revalidatePath } from 'next/cache'
import { CreatedExpenseProps } from './components/FormCreateExpense'
import { prisma } from '@/lib/prisma'

export async function createdExpense(values: CreatedExpenseProps) {
  try {
    await prisma.expense.create({
      data: {
        name: values.name,
        description: values.description,
        amount: values.amount ? Number(values.amount) : 0,
        date: values.date ? new Date(values.date) : new Date(),
        userId: values?.userId || 0,
      },
    })
    revalidatePath('/dashboard')
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
    revalidatePath('/dashboard')
    revalidatePath('/expense')
    return { message: 'Expense deleted' }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

export async function importRecussing(userId: number) {
  try {
    const recurrings = await prisma.recurringExpense.findMany({
      where: {
        userId,
      },
    })
    await recurrings.map((item) =>
      prisma.expense
        .create({
          data: {
            name: item.name,
            description: item.description,
            amount: item.amount,
            date: new Date(),
            userId,
          },
        })
        .then((res) => res.id),
    )
    revalidatePath('/dashboard')
    revalidatePath('/expense')
    return { status: true, message: 'Recurring imported' }
  } catch (error) {
    return { error: 'Something went wrong', status: false }
  }
}

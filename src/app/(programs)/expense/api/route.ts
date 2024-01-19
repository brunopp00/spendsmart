import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId } = await request.json()
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
    })
    return NextResponse.json(expenses, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// export async function POST(request: Request) {
//   const { name, description, amount, date, userId } = await request.json()
//   try {
//     await prisma.expense.create({
//       data: {
//         name,
//         description,
//         amount,
//         date,
//         userId,
//       },
//     })
//     return NextResponse.json({ message: 'Expense created' }, { status: 201 })
//   } catch (error) {
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
//   }
// }

export async function DELETE(request: Request) {
  const { id } = await request.json()
  try {
    await prisma.expense.delete({
      where: {
        id,
      },
    })
    return NextResponse.json({ message: 'Expense deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

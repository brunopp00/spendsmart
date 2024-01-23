import { prisma } from '@/lib/prisma'
import { useUserStore } from '@/store/user'
import { FormCreateExpense } from './components/FormCreateExpense'
import { ImportRecurring } from './components/ImportRecurring'
import PDFPage from './pdf'
import { ListExpense } from './components/ListExpense'

export default async function ExpenseList() {
  const {
    state: { user },
  } = useUserStore.getState()

  const list = await prisma.expense.findMany({
    where: {
      userId: user?.id,
    },
  })

  const sumOfValues = list.reduce((acc, item) => {
    return acc + item.amount
  }, 0)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <h1 className="text-3xl dark:text-white">Expense List</h1>
        <div className="flex gap-3">
          <PDFPage data={list} />
          <ImportRecurring />
          <FormCreateExpense />
        </div>
      </div>
      <hr />
      <ListExpense sumOfValues={sumOfValues} list={list} />
    </div>
  )
}

'use server';

import db from '@/db/db';
import { auth } from '@clerk/nextjs/server';

type GetIncomeExpenseType = {
  income?: number;
  expense?: number;
  error?: string;
};

export default async function getIncomeExpense(): Promise<GetIncomeExpenseType> {
  const { userId } = auth();
  if (!userId) return { error: 'User Not Found' };

  try {
    const transaction = await db.transactions.findMany({
      where: { userId }
    });

    const amounts = transaction.map(transaction => transaction.amount);
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => acc + item, 0);
    const expense = amounts
      .filter(amount => amount < 0)
      .reduce((acc, amount) => acc + amount, 0);

    return { expense: Math.abs(expense), income };
  } catch (error) {
    return { error: 'Database Error' };
  }
}

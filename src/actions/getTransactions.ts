'use server';

import db from '@/db/db';
import type { Transaction } from '@/types/Transaction.type';
import { auth } from '@clerk/nextjs/server';

type GetTransactionsType = {
  transactions?: Transaction[];
  error?: string;
};

export default async function getTransactions(): Promise<GetTransactionsType> {
  const { userId } = auth();
  if (!userId) return { error: 'User Not Found' };

  try {
    const transactions = await db.transactions.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return { transactions };
  } catch (error) {
    return { error: 'Database Error' };
  }
}

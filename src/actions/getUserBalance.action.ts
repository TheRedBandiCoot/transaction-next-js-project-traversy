'use server';

import db from '@/db/db';
import { auth } from '@clerk/nextjs/server';

type GetUserBalReturnType = {
  balance?: number;
  error?: string;
};

export default async function getUserBalance(): Promise<GetUserBalReturnType> {
  const { userId } = auth();
  if (!userId) return { error: 'User Not Found' };

  try {
    const transaction = await db.transactions.findMany({
      where: { userId }
    });
    const balance = transaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    return { balance };
  } catch (error) {
    return { error: 'Database Error' };
  }
}

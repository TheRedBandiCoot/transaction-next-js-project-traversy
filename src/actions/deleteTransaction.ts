'use server';

import db from '@/db/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

type DeleteTransactionType = {
  message?: string;
  error?: string;
};

export default async function deleteTransaction(
  transactionId: string
): Promise<DeleteTransactionType> {
  const { userId } = auth();
  if (!userId) return { error: 'User Not Found' };

  try {
    await db.transactions.delete({
      where: { id: transactionId, userId }
    });

    revalidatePath('/');
    return { message: 'Transaction deleted successfully' };
  } catch (error) {
    return { error: 'Database Error' };
  }
}

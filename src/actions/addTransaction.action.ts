'use server';

import db from '@/db/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

type TransactionData = {
  text: string;
  amount: number;
};

type TransactionResult = {
  data?: TransactionData;
  error?: string;
};

export default async function addTransaction(
  formData: FormData
): Promise<TransactionResult> {
  const textValue = formData.get('text') as string;
  const amountValue = formData.get('amount') as string;

  // console.log(textValue, amountValue);

  // Check for input values
  if (!textValue || !amountValue || textValue.trim() === '') {
    return { error: 'Please fill in all fields.' };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const { userId } = auth();

  // console.log(userId);

  if (!userId) return { error: 'User not found' };

  try {
    const transactionData: TransactionData = await db.transactions.create({
      data: {
        text,
        amount,
        userId
      }
    });

    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    return { error: 'Transaction Not Added' };
  }
}

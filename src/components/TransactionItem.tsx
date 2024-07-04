'use client';
import deleteTransaction from '@/actions/deleteTransaction';
import { addCommas } from '@/libs/utils';
import type { Transaction } from '@/types/Transaction.type';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function TransactionItem({
  transaction
}: {
  transaction: Transaction;
}) {
  const [toasterIn, SetToasterIn] = useState(false);

  const sign = transaction.amount < 0 ? '-' : '+';

  async function handleDeleteTransaction(transactionId: string) {
    //@ TODO: make sure one toaster show
    SetToasterIn(true);
    toast(<DeleteTransactionToaster transactionId={transactionId} />, {
      autoClose: false,
      position: 'top-center'
    });
  }

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        <span className='sign'>{sign}</span>
        {addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className='delete-btn'
        onClick={() => handleDeleteTransaction(transaction.id)}
      >
        x
      </button>
    </li>
  );
}

function DeleteTransactionToaster({
  transactionId
}: {
  transactionId: string;
}) {
  return (
    <div className='delete-transaction-toaster'>
      <h3>Are you sure you want to delete this transaction?</h3>
      <div>
        <button
          onClick={async () => {
            toast.dismiss();
            const { message, error } = await deleteTransaction(transactionId);
            if (error) return toast.error(error);
            toast.success(message);
          }}
          className='btn btn-confirm'
        >
          Yes
        </button>
        <button onClick={() => toast.dismiss()} className='btn btn-danger'>
          No
        </button>
      </div>
    </div>
  );
}

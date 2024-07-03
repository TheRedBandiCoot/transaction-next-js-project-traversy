'use client';

import addTransaction from '@/actions/addTransaction.action';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

export default function AddTransaction() {
  const formRef = useRef<HTMLFormElement | null>(null);

  async function clientAction(formData: FormData) {
    const { data, error } = await addTransaction(formData);
    if (error) return toast.error(error);
    else {
      toast.success('Transaction added');
      formRef.current?.reset();
    }
  }

  return (
    <>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            id='text'
            name='text'
            placeholder='Enter text...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='Enter amount...'
            step='0.01'
          />
        </div>
        <AddTransactionBtn />
      </form>
    </>
  );
}

function AddTransactionBtn() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className='btn'>
      {pending ? 'Loading...' : 'Add transaction'}
    </button>
  );
}

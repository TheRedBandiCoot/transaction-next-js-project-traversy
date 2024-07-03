import getUserBalance from '@/actions/getUserBalance.action';
import { addCommas } from '@/libs/utils';

export default async function Balance() {
  const { balance, error } = await getUserBalance();

  if (error) return error;

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{addCommas(balance ?? 0)}</h1>
    </>
  );
}

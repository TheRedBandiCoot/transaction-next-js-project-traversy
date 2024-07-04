import getUserBalance from '@/actions/getUserBalance.action';
import { addCommas } from '@/libs/utils';

export default async function Balance() {
  const { balance, error } = await getUserBalance();

  if (error) return <p className='error'>{error}</p>;

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{addCommas(Number(balance?.toFixed(2) ?? 0))}</h1>
    </>
  );
}

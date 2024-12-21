import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';
import TableHeader from './TableHeader';

interface IProps {
  transactions: ITransaction[];
}

const TransactionsTable = ({ transactions }: IProps) => {
  return (
    <div className='col-span-4 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='px-4 py-6 md:px-6 xl:px-7.5'>
      <TableHeader title="Transactions" />
      </div>
      {transactions.map((transaction: ITransaction, i: number) => (
        <div
          className='grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5'
          key={i}
        >
          <div className='col-span-1 flex items-center'>
            {transaction.amount > 0 ? (
              <div className='h-12 w-12 rounded-md bg-emerald-600 text-emerald-400 flex items-center justify-center text-xl'>
                <Icon icon={faArrowUp} />
              </div>
            ) : (
              <div className='h-12 w-12 rounded-md bg-rose-600 text-rose-400 flex items-center justify-center text-xl'>
                <Icon icon={faArrowDown} />
              </div>
            )}
          </div>
          <div className='col-span-10 flex flex-col justify-center'>
            <p className='text-sm'>
              {transaction.amount > 0 ? (
                <span className=' text-emerald-400'>{transaction.amount}</span>
              ) : (
                <span className=' text-rose-400'>{transaction.amount}</span>
              )}
            </p>
            <p className='text-sm text-black dark:text-white'>
              Account Barclays 1234
            </p>
          </div>
          <div className='col-span-1 flex flex-col justify-center items-end text-sm text-black dark:text-white'>
            <p>3 Jan</p>
            <p>15:41</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsTable;

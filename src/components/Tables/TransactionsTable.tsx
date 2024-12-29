import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';
import TableHeader from './TableHeader';
import TableContainer from './TableContainer';

interface IProps {
  transactions: ITransaction[];
}

const TransactionsTable = ({ transactions }: IProps) => {
  return (
    <>
      <TableHeader title='Transactions' />

      {transactions.map((transaction: ITransaction, i: number) => {
        const isPositive = transaction.amount > 0;

        return (
          <div
            className='grid grid-cols-12 border-t border-stroke mt-4 py-4.5 dark:border-strokedark sm:grid-cols-12'
            key={i}
          >
            <div className='col-span-2 flex items-center'>
              {
                <div
                  className={`h-8 min-w-8 rounded-md flex items-center justify-center text-xl ${isPositive ? 'bg-emerald-600 text-emerald-400' : 'bg-rose-600 text-rose-400'}`}
                >
                  <Icon icon={isPositive ? faArrowUp : faArrowDown} />
                </div>
              }
            </div>
            <div className='col-span-8 flex flex-col justify-center'>
              <p className='text-sm'>
                <span
                  className={isPositive ? 'text-emerald-400' : 'text-rose-400'}
                >
                  {transaction.amount}
                </span>
              </p>
              <p className='text-sm text-black dark:text-white'>
                Account Barclays 1234
              </p>
            </div>
            <div className='col-span-2 flex flex-col justify-center items-end text-sm text-black dark:text-white'>
              <p>3 Jan</p>
              <p>15:41</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TransactionsTable;

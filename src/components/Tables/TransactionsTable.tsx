import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';
import TableHeader from './TableHeader';
import { currencyFormat } from '@/utils/string';

interface IProps {
  transactions: ITransaction[];
}

const TransactionsTable = ({ transactions }: IProps) => {
  return (
    <>
      <TableHeader
        title='Transactions'
        linkHref='/transactions'
        linkText='View All'
      />
      {transactions.map((transaction: ITransaction, i: number) => {
        const isPositive = transaction.amount > 0;
        return (
          <div
            className='grid grid-cols-12 mt-4 py-4.5 sm:grid-cols-12'
            key={i}
          >
            <div className='col-span-3 flex items-center'>
              {
                <div
                  className={`h-10 min-w-10 rounded-md flex items-center justify-center text-xl border border-stroke dark:border-0 ${isPositive ? 'bg-gray-1 text-mid-green dark:bg-dark-green dark:text-light-green' : 'bg-gray-1 text-mid-red dark:bg-dark-red dark:text-light-red'}`}
                >
                  <Icon icon={isPositive ? faArrowUp : faArrowDown} />
                </div>
              }
            </div>
            <div className='font-medium gap-1 text-sm col-span-7 flex flex-col justify-center'>
              <p>
                <span
                  className={
                    isPositive
                      ? 'text-mid-green dark:text-light-green'
                      : 'text-mid-red dark:text-light-red'
                  }
                >
                  {currencyFormat.format(transaction.amount)}
                </span>
              </p>
              <p className='text-black dark:text-white'>
                Account Barclays 1234
              </p>
            </div>
            <div className=' gap-1 col-span-2 flex flex-col justify-center items-end text-sm text-black dark:text-white'>
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

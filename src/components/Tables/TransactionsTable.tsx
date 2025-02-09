import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';
import TableHeader from './TableHeader';
import {
  currencyFormat,
  getEuropeanYear,
  getMonthDate,
  getTime,
} from '@/utils/string';

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
      <div className='hidden xsm:grid grid-cols-12 mt-4 py-4.5 text-xs font-medium text-black dark:text-white xsm:text-sm 2lg:hidden'>
        <div className='col-start-2 col-span-2'>Amount</div>
        <div className='col-span-3 flex justify-center'>Asset</div>
        <div className='col-span-3 flex justify-center'>Category</div>
        <div className='col-span-3 flex justify-end'>Created</div>
      </div>
      {transactions.map((transaction: ITransaction, i: number) => {
        const { asset_id, amount, createdAt } = transaction;
        const date = new Date(createdAt);
        const isPositive = amount > 0;

        return (
          <div
            className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white xsm:text-sm'
            key={i}
          >
            <div className='col-span-2 xsm:col-span-1 flex items-center 2lg:col-span-2 2lg:justify-start'>
              {
                <div
                  className={`h-8 min-w-8 xsm:h-10 xsm:min-w-10 rounded-md flex items-center justify-center text-xl border border-stroke dark:border-0 ${isPositive ? 'bg-gray-1 text-mid-green dark:bg-dark-green dark:text-light-green' : 'bg-gray-1 text-mid-red dark:bg-dark-red dark:text-light-red'} 2lg:h-8 2lg:min-w-8`}
                >
                  <span className='hidden xsm:flex 2lg:hidden'>
                    <Icon icon={isPositive ? faArrowUp : faArrowDown} />
                  </span>
                  <span className='flex xsm:hidden 2lg:flex'>
                    <Icon
                      icon={isPositive ? faArrowUp : faArrowDown}
                      size='sm'
                    />
                  </span>
                </div>
              }
            </div>

            <div className='gap-1 text-xs col-span-8 xsm:col-start-2 xsm:col-span-2 flex flex-col xsm:flex-row justify-center xsm:text-sm xsm:items-center xsm:justify-start 2lg:col-span-8 2lg:flex-col 2lg:items-start'>
              <span
                className={`${
                  isPositive
                    ? 'text-mid-green dark:text-light-green'
                    : 'text-mid-red dark:text-light-red'
                } font-medium `}
              >
                {currencyFormat.format(transaction.amount)}
              </span>
              <span className='flex xsm:hidden col-span-3 2lg:flex'>
                {asset_id?.name}
              </span>
            </div>
            <div className='hidden col-span-3 justify-center items-center xsm:flex 2lg:hidden'>
              {asset_id?.name}
            </div>
            <div className='hidden col-span-3 justify-center items-center xsm:flex 2lg:hidden'>
              {asset_id?.category}
            </div>
            <div className='hidden gap-1 col-span-3 justify-end items-center xsm:flex 2lg:hidden'>
              {getEuropeanYear(date)}
            </div>
            <div className='gap-1 col-span-2 flex flex-col justify-center items-end xsm:hidden 2lg:flex'>
              <p>{getMonthDate(date)}</p>
              <p>{getTime(date)}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TransactionsTable;

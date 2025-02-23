'use client';
import {
  faArrowDown,
  faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';
import TableHeader from './TableHeader';
import {
  currencyFormat,
  getEuropeanYear,
  getMonthDate,
  getTime,
} from '@/utils/string';
import { useEffect, useState } from 'react';
import { getTransactions } from '@/utils/api';
import Button from '../Common/Button';
import Paginator from './Paginator';
import TransactionIcon from './TransactionInfo';
import TransactionInfo from './TransactionInfo';

interface IProps {
  transactions: IPaginatedTransactions;
  showFullData?: boolean;
}

const TransactionsTable = ({ transactions, showFullData }: IProps) => {
  const [sort, setSort] = useState<ISort>({
    by: 'updatedAt',
    order: 'desc',
  });
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [paginatedTransactions, setPaginatedTransactions] =
    useState<IPaginatedTransactions>(transactions);

  const handleSort = (sortBy: string) => {
    let orderBy = 'desc';
    if (sortBy === sort.by && sort.order === 'desc') {
      orderBy = 'asc';
    }
    setSort({
      by: sortBy,
      order: orderBy,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (limit: string) => {
    const numLimit = Number(limit);
    if (isNaN(Number(numLimit))) {
      return;
    }
    setPage(1);
    setLimit(numLimit);
  };

  useEffect(() => {
    const fetchAssets = async () => {
      const transactions = await getTransactions(
        limit,
        sort.by,
        sort.order,
        page
      );
      setPaginatedTransactions(transactions);
    };
    fetchAssets();
  }, [sort, sort.by, sort.order, page, limit]);

  return showFullData ? (
    <>
      <div className='grid grid-cols-12 mt-4 mb-1 text-xs font-medium text-black dark:text-white xsm:text-sm'>
        <div className='col-span-3 flex sm:col-span-2 items-center'>
          <Button
            text='Date'
            onClick={() => handleSort('updatedAt')}
            icon={faSort}
            iconAlign='right'
            hasBg={false}
            iconSize='xs'
            classes={sort.by === 'updatedAt' ? 'font-bold' : 'font-normal'}
          />
        </div>
        <div className='col-span-3 flex sm:col-span-4 items-center'>
          <Button
            text='Amount'
            onClick={() => handleSort('name')}
            icon={faSort}
            iconAlign='right'
            hasBg={false}
            iconSize='xs'
            classes={sort.by === 'name' ? 'font-bold' : 'font-normal'}
          />
        </div>
        <div className='col-span-3 flex justify-end items-center sm:col-span-3'>
          <Button
            text='Asset Name'
            onClick={() => handleSort('category')}
            icon={faSort}
            iconAlign='right'
            hasBg={false}
            iconSize='xs'
            classes={sort.by === 'category' ? 'font-bold' : 'font-normal'}
          />
        </div>
        <div className='col-span-3 flex justify-end items-center sm:col-span-3'>
          <Button
            text='Category'
            onClick={() => handleSort('numShares')}
            icon={faSort}
            iconAlign='right'
            hasBg={false}
            iconSize='xs'
            classes={sort.by === 'numShares' ? 'font-bold' : 'font-normal'}
          />
        </div>
      </div>

      {paginatedTransactions.transactions.map(
        (transaction: ITransactionData, i: number) => {
          const { asset, amount, date } = transaction;

          return (
            <div
              className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white xsm:text-sm'
              key={i}
            >
              <div className='col-span-3 flex flex-wrap items-center sm:col-span-2'>
                {date}
              </div>
              <div className='col-span-3 flex flex-wrap items-center sm:col-span-4'>
                <TransactionInfo amount={amount} />
              </div>
              <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-3'>
                {asset.name}
              </div>
              <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-3'>
                {asset.category}
              </div>
            </div>
          );
        }
      )}
      <Paginator
        totalCount={paginatedTransactions.totalCount}
        totalPages={paginatedTransactions.totalPages}
        currentPage={paginatedTransactions.currentPage}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </>
  ) : (
    <>
      <div className='hidden xsm:grid grid-cols-12 mt-4 py-4.5 text-xs font-medium text-black dark:text-white xsm:text-sm 2lg:hidden'>
        <div className='col-start-2 col-span-2'>Amount</div>
        <div className='col-span-3 flex justify-center'>Asset</div>
        <div className='col-span-3 flex justify-center'>Category</div>
        <div className='col-span-3 flex justify-end'>Created</div>
      </div>
      {paginatedTransactions.transactions.map(
        (transaction: ITransactionData, i: number) => {
          const { asset, amount, updatedAt } = transaction;
          const date = new Date(updatedAt);

          return (
            <div
              className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white xsm:text-sm'
              key={i}
            >
              <TransactionInfo
                amount={amount}
                assetName={asset.name}
              />
              <div className='hidden col-span-3 justify-center items-center xsm:flex 2lg:hidden'>
                {asset?.name}
              </div>
              <div className='hidden col-span-3 justify-center items-center xsm:flex 2lg:hidden'>
                {asset?.category}
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
        }
      )}
    </>
  );
};

export default TransactionsTable;

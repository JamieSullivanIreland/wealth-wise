'use client';
import { useEffect, useState } from 'react';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import {
  currencyFormat,
  getEuropeanYear,
  getMonthDate,
  getTime,
} from '@/utils/string';
import { getTransactions } from '@/utils/api';
import Button from '../Common/Button';
import Paginator from './Paginator';
import TransactionInfo from './TransactionAmountInfo';
import TableHeader from './TableHeader';

interface IProps {
  transactions: IPaginatedTransactions;
  showFullData?: boolean;
}

const TransactionsTable = ({ transactions, showFullData }: IProps) => {
  const link: ILink = {
    href: '/transactions',
    text: 'View All',
  };

  const [sort, setSort] = useState<ISort>({
    by: 'updatedAt',
    order: 'desc',
  });
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [paginatedTransactions, setPaginatedTransactions] =
    useState<IPaginatedTransactions>(transactions);

  const handleSort = (sortBy: TransactionSortBy) => {
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
    if (showFullData) {
      fetchAssets();
    }
  }, [sort, sort.by, sort.order, page, limit, showFullData]);

  return showFullData ? (
    <>
      <TableHeader title='Transactions' />
      <div>
        <div className='grid grid-cols-12 mb-2 text-xs font-medium text-black dark:text-white xsm:text-sm'>
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
          <div className='col-span-3 flex sm:col-span-2 items-center'>
            <Button
              text='Amount'
              onClick={() => handleSort('amount')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'name' ? 'font-bold' : 'font-normal'}
            />
          </div>
          <div className='col-span-3 flex sm:col-span-2 justify-center items-center'>
            <Button
              text='Type'
              onClick={() => handleSort('type')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'name' ? 'font-bold' : 'font-normal'}
            />
          </div>
          <div className='col-span-3 flex justify-center items-center sm:col-span-2'>
            <Button
              text='Category'
              onClick={() => handleSort('assetCategory')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'numShares' ? 'font-bold' : 'font-normal'}
            />
          </div>
          <div className='col-span-3 flex justify-end items-center sm:col-span-2'>
            <Button
              text='Asset Name'
              onClick={() => handleSort('assetName')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'category' ? 'font-bold' : 'font-normal'}
            />
          </div>
          <div className='col-span-3 flex justify-end items-center sm:col-span-2'>
            <Button
              text='Asset Total'
              onClick={() => handleSort('assetTotal')}
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
            const { asset, amount, type, assetTotal, updatedAt } = transaction;

            return (
              <div
                className='grid grid-cols-12 py-3 text-xs text-black dark:text-white xsm:text-sm'
                key={i}
              >
                <div className='col-span-3 flex flex-wrap items-center sm:col-span-2'>
                  {getEuropeanYear(new Date(updatedAt))}
                </div>
                <div className='col-span-3 flex flex-wrap items-center sm:col-span-2'>
                  <TransactionInfo
                    amount={amount}
                    isFullTable
                  />
                </div>
                <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-2'>
                  {type}
                </div>
                <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-2'>
                  {asset.category}
                </div>
                <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-2'>
                  {asset.name}
                </div>
                <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-2'>
                  {currencyFormat.format(assetTotal)}
                </div>
              </div>
            );
          }
        )}
      </div>
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
      <TableHeader
        title='Transactions'
        link={link}
      />
      <div>
        {paginatedTransactions.transactions.map(
          (transaction: ITransactionData, i: number) => {
            const { asset, amount, updatedAt } = transaction;
            const date = new Date(updatedAt);

            return (
              <div
                className='grid grid-cols-12 pb-6 text-xs text-black dark:text-white xsm:text-sm'
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
      </div>
    </>
  );
};

export default TransactionsTable;

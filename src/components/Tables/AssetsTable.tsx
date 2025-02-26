'use client';
import { currencyFormat, getEuropeanYear } from '@/utils/string';
import Button from '../Common/Button';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAssets } from '@/utils/api';
import Paginator from './Paginator';
import TableHeader from './TableHeader';

interface IProps {
  assets: IPaginatedAssets;
  showFullData?: boolean;
}

const AssetsTable = ({ assets, showFullData }: IProps) => {
  const link: ILink = {
    href: '/assets',
    text: 'View All',
  };

  const [sort, setSort] = useState<ISort>({
    by: 'updatedAt',
    order: 'desc',
  });
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [paginatedAssets, setPaginatedAssets] =
    useState<IPaginatedAssets>(assets);

  const handleSort = (sortBy: AssetSortBy) => {
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
      const assets = await getAssets(limit, sort.by, sort.order, page);
      setPaginatedAssets(assets);
    };
    if (showFullData) {
      fetchAssets();
    }
  }, [sort, sort.by, sort.order, page, limit, showFullData]);

  return showFullData ? (
    <>
      <TableHeader title='Assets' />
      <div>
        <div className='grid grid-cols-12 mb-2 text-md font-medium text-black dark:text-white xsm:text-2xl'>
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
              text='Name'
              onClick={() => handleSort('name')}
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
              onClick={() => handleSort('category')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'category' ? 'font-bold' : 'font-normal'}
            />
          </div>
          <div className='col-span-3 flex justify-center items-center sm:col-span-2'>
            <Button
              text='Shares'
              onClick={() => handleSort('numShares')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'numShares' ? 'font-bold' : 'font-normal'}
            />
          </div>
          <div className='col-span-3 flex justify-center items-center sm:justify-end sm:col-span-2'>
            <Button
              text='Cost'
              onClick={() => handleSort('cost')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'cost' ? 'font-bold' : 'font-normal'}
            />
          </div>
          <div className='col-span-3 flex justify-end items-center sm:col-span-2'>
            <Button
              text='Value'
              onClick={() => handleSort('value')}
              icon={faSort}
              iconAlign='right'
              hasBg={false}
              iconSize='xs'
              classes={sort.by === 'value' ? 'font-bold' : 'font-normal'}
            />
          </div>
        </div>

        {paginatedAssets.assets.map((asset: IAssetData, i: number) => {
          const { updatedAt, name, category, numShares, cost, value } = asset;
          return (
            <div
              className='grid grid-cols-12 py-3 text-xs text-black dark:text-white xsm:text-sm'
              key={i}
            >
              <div className='col-span-3 flex flex-wrap items-center sm:col-span-2'>
                {getEuropeanYear(new Date(updatedAt))}
              </div>
              <div className='col-span-3 flex flex-wrap items-center sm:col-span-2'>
                {name}
              </div>
              <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-2'>
                {category}
              </div>
              <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-2'>
                {numShares}
              </div>
              <div className='col-span-3 flex flex-wrap justify-center items-center sm:justify-end sm:col-span-2'>
                {currencyFormat.format(cost)}
              </div>
              <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-2'>
                {currencyFormat.format(value)}
              </div>
            </div>
          );
        })}
      </div>
      <Paginator
        totalCount={paginatedAssets.totalCount}
        totalPages={paginatedAssets.totalPages}
        currentPage={paginatedAssets.currentPage}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </>
  ) : (
    <>
      <TableHeader
        title='Assets'
        link={link}
      />

      <div>
        <div className='grid grid-cols-12 text-xs font-medium text-black dark:text-white xsm:text-sm'>
          <div className='col-span-3 flex sm:col-span-4 items-center'>Name</div>
          <div className='col-span-3 flex justify-center items-center sm:col-span-4'>
            Category
          </div>
          <div className='col-span-3 flex justify-center items-center sm:justify-end sm:col-span-2'>
            Cost
          </div>
          <div className='col-span-3 flex justify-end items-center sm:col-span-2'>
            Value
          </div>
        </div>

        {paginatedAssets.assets.map((asset: IAssetData, i: number) => {
          const { name, category, cost, value } = asset;

          return (
            <div
              className='grid grid-cols-12 py-4 text-xs text-black dark:text-white xsm:text-sm'
              key={i}
            >
              <div className='col-span-3 flex flex-wrap items-center sm:col-span-4'>
                {name}
              </div>
              <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-4'>
                {category}
              </div>
              <div className='col-span-3 flex flex-wrap justify-center items-center sm:justify-end sm:col-span-2'>
                {currencyFormat.format(cost)}
              </div>
              <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-2'>
                {currencyFormat.format(value)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AssetsTable;

'use client';
import { currencyFormat } from '@/utils/string';
import Button from '../Common/Button';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAssets } from '@/utils/api';
import Paginator from './Paginator';

interface IProps {
  assets: IAssetData[];
  showFullData?: boolean;
}

const AssetsTable = ({ assets, showFullData }: IProps) => {
  const [sort, setSort] = useState<ISort>({
    by: 'updatedAt',
    order: 'desc',
  });
  const [assetsData, setAssetsData] = useState<IAssetData[]>(assets);

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

  const handlePageChange = () => {
    console.log('Change');
  };

  useEffect(() => {
    const fetchAssets = async () => {
      const assets = await getAssets(10, sort.by, sort.order);
      setAssetsData(assets);
    };
    fetchAssets();
  }, [sort, sort.by, sort.order]);

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
        <div className='col-span-3 flex sm:col-span-3 items-center'>
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
        <div className='col-span-3 flex justify-center items-center sm:col-span-1'>
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

      {assetsData.map((asset: IAssetData, i: number) => {
        const { date, name, category, numShares, cost, value } = asset;
        return (
          <div
            className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white xsm:text-sm'
            key={i}
          >
            <div className='col-span-3 flex flex-wrap items-center sm:col-span-2'>
              {date}
            </div>
            <div className='col-span-3 flex flex-wrap items-center sm:col-span-3'>
              {name}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-2'>
              {category}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-1'>
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
      <Paginator
        currentPage={1}
        totalPages={10}
        pageSize={10}
        totalItems={100}
        onPageChange={handlePageChange}
      />
    </>
  ) : (
    <>
      <div className='grid grid-cols-12 mt-4 py-4.5 text-xs font-medium text-black dark:text-white xsm:text-sm'>
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

      {assetsData.map((asset: IAssetData, i: number) => {
        const { name, category, cost, value } = asset;

        return (
          <div
            className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white xsm:text-sm'
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
      <Paginator
        currentPage={1}
        totalPages={10}
        pageSize={10}
        totalItems={100}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AssetsTable;

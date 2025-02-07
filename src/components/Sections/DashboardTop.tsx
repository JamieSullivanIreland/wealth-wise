'use client';

import { useEffect, useState } from 'react';

import CategoryChart from '../Tables/CategoryChart';
import DashboardTabButtons from './DashboardTabButtons';
import NetworthSummary from './NetworthSummary';
import NetworthTable from '../Tables/NetworthTable';
import NetworthFilterButtons from './NetworthFilterButtons';
import { getNetWorth } from '@/utils/api';

interface IProps {
  categories: ICategory[];
  tableClasses: string;
}

const DashboardTopSection = ({ categories, tableClasses }: IProps) => {
  const [networth, setNetworth] = useState<INetworth | null>(null);
  const [totalNetworth, setTotalNetworth] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('Chart');
  const [activeFilter, setActiveFilter] = useState<NetworthFilter>('week');

  const handleTabClick = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const handleFilterClick = (filter: NetworthFilter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    setLoading(true);
    getNetWorth(activeFilter).then((networth: INetworth) => {
      setNetworth(networth);
      setTotalNetworth(networth.results[networth.results.length - 1].total);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  if (!networth) return <p>No Networth</p>;

  return (
    <>
      {/* Show above 768px */}
      <div className='hidden md:grid grid-cols-12'>
        <div
          className={`flex flex-col col-span-8 rounded-s-xl border-r-0 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthSummary
            diffPercentage={networth.diffPercentage}
            diffTotal={networth.diffTotal}
            totalNetworth={totalNetworth}
          />
          <NetworthFilterButtons
            activeFilter={activeFilter}
            handleClick={handleFilterClick}
          />
          <div className='min-h-[365px]'>
            <NetworthTable
              isLoading={isLoading}
              data={networth.results}
              totalNetworth={totalNetworth}
              activeFilter={activeFilter}
            />
          </div>
        </div>
        <div
          className={`col-span-4 rounded-e-xl dark:bg-dark-1 ${tableClasses}`}
        >
          <h4 className='text-lg font-medium text-black dark:text-gray-2 mb-8'>
            Categories
          </h4>
          <CategoryChart
            totalNetworth={totalNetworth}
            categories={categories}
          />
        </div>
      </div>

      {/* Show below 768px */}
      <div className='grid grid-cols-12 md:hidden'>
        <div
          className={`flex flex-col col-span-12 rounded-xl border-r-1 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthSummary
            diffPercentage={networth.diffPercentage}
            diffTotal={networth.diffTotal}
            totalNetworth={totalNetworth}
          />
          <DashboardTabButtons
            handleTabClick={handleTabClick}
            tabs={['Chart', 'Categories']}
          />
          {activeTab === 'Chart' && (
            <div className='min-h-[365px]'>
              <NetworthTable
                isLoading={isLoading}
                data={networth.results}
                totalNetworth={totalNetworth}
                activeFilter={activeFilter}
              />
            </div>
          )}
          <NetworthFilterButtons
            activeFilter={activeFilter}
            handleClick={handleFilterClick}
          />
          {activeTab === 'Categories' && (
            <CategoryChart
              totalNetworth={totalNetworth}
              categories={categories}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTopSection;

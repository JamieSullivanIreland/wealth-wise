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
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>('Chart');
  const [activeFilter, setActiveFilter] = useState<NetworthFilter>('all');

  const handleTabClick = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const handleFilterClick = (filter: NetworthFilter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    getNetWorth(activeFilter).then((data: INetworth) => {
      setNetworth(data);
      setLoading(false);
    });
  }, [activeFilter]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* Show above 768px */}
      <div className='hidden md:grid grid-cols-12'>
        <div
          className={`col-span-8 rounded-s-xl border-r-0 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthSummary isPositive={true} />
          <NetworthFilterButtons
            activeFilter={activeFilter}
            handleClick={handleFilterClick}
          />
          <NetworthTable
            networth={networth}
            activeFilter={activeFilter}
          />
        </div>
        <div
          className={`col-span-4 rounded-e-xl dark:bg-dark-1 ${tableClasses}`}
        >
          <h4 className='text-lg font-medium text-black dark:text-gray-2 mb-8'>
            Categories
          </h4>
          <CategoryChart categories={categories} />
        </div>
      </div>

      {/* Show below 768px */}
      <div className='grid grid-cols-12 md:hidden'>
        <div
          className={`col-span-12 rounded-xl border-r-1 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthSummary isPositive={true} />
          <DashboardTabButtons
            handleTabClick={handleTabClick}
            tabs={['Chart', 'Categories']}
          />
          {activeTab === 'Chart' && (
            <NetworthTable
              activeFilter={activeFilter}
              networth={networth}
            />
          )}
          <NetworthFilterButtons
            activeFilter={activeFilter}
            handleClick={handleFilterClick}
          />
          {activeTab === 'Categories' && (
            <CategoryChart categories={categories} />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTopSection;

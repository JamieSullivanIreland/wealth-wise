'use client';

import { useState } from 'react';

import CategoryChart from '../Tables/CategoryChart';
import DashboardTabButtons from './DashboardTabButtons';
import NetworthSummary from './NetworthSummary';
import NetworthTable from '../Tables/NetworthTable';
import NetworthFilterButtons from './NetworthFilterButtons';

interface IProps {
  networth: INetworth[];
  categories: ICategory[];
  tableClasses: string;
}

const DashboardTopSection = ({
  networth,
  categories,
  tableClasses,
}: IProps) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('Chart');
  const [activeFilter, setActiveFilter] = useState<NetworthFilter>('week');

  const handleTabClick = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const handleFilterClick = (filter: NetworthFilter) => {
    setActiveFilter(filter);
  };

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
          <NetworthTable networth={networth} />
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
          {activeTab === 'Chart' && <NetworthTable networth={networth} />}
          {activeTab === 'Categories' && (
            <CategoryChart categories={categories} />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTopSection;

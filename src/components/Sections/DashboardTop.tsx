'use client';

import { useEffect, useState } from 'react';

import CategoryChart from '../Tables/CategoryChart';
import DashboardTabButtons from './DashboardTabButtons';
import NetworthSummary from './NetworthSummary';
import NetworthTable from '../Tables/NetworthTable';
import NetworthFilterButtons from './NetworthFilterButtons';
import { getNetWorth } from '@/utils/api';
import { getEuropeanYear } from '@/utils/string';

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
  const [seriesData, setSeriesData] = useState<ISeries | undefined>(undefined);

  const handleTabClick = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const handleFilterClick = (filter: NetworthFilter) => {
    setActiveFilter(filter);
  };

  const getTotalNetworth = () => {
    return seriesData && seriesData?.length > 0
      ? Number(seriesData[seriesData.length - 1].y)
      : 0;
  };
  const getNumDays = () => {
    // TODO Fix the formatting of dates
    switch (activeFilter) {
      case 'week':
        return 7;
      case 'month':
        return 30;
      case 'year':
        return 365;
      case 'all':
      default:
        return 0;
    }
  };

  const getDateLabel = (timestamp: string) => {
    const date = new Date(timestamp.split('/').reverse().join('/'));

    switch (activeFilter) {
      case 'all':
        return Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      case 'year':
        return `${Intl.DateTimeFormat('en', { month: 'short' }).format(date)} ${date.getFullYear().toString().substring(2)}`;
      case 'month':
        return getEuropeanYear(date);
      case 'week':
        return `${new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)} ${date.getDate()}`;
      default:
        break;
    }
  };

  const getDateNDaysAgo = (n: number, fromDate: Date) => {
    const date = new Date(fromDate);
    date.setDate(date.getDate() - n);
    return date;
  };

  const formatSeriesData = (networthData: INetworth) => {
    // TODO Refactor and fix type errors
    const numDays = getNumDays();
    const dateObj = {};
    const values = [];
    let prevTotal = networthData.prevTotal;

    for (let i = 0; i < numDays; i++) {
      const newDate = getDateNDaysAgo(i, new Date());
      dateObj[newDate.toLocaleDateString()] = {
        total: 0,
      };
      if (activeFilter === 'month') {
        i += 5;
      }
      if (activeFilter === 'year') {
        i += 29;
      }
    }

    networthData.results.forEach((result: INetworthResult) => {
      const dateKey = new Date(result.timestamp).toLocaleDateString();

      if (dateObj.hasOwnProperty(dateKey)) {
        dateObj[dateKey] = {
          total: result.total,
        };
      }
    });

    Object.entries(dateObj)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, value]) => {
        if (value.total === 0) {
          dateObj[key] = {
            total: prevTotal,
          };
        } else {
          const newTotal = prevTotal + value.total;
          dateObj[key] = {
            total: prevTotal + value.total,
          };
          prevTotal = newTotal;
        }

        values.push({
          x: getDateLabel(key),
          y: dateObj[key].total,
        });
      });

    return values;
  };

  useEffect(() => {
    setLoading(true);
    getNetWorth(activeFilter).then((networth: INetworth) => {
      setNetworth(networth);
      setSeriesData(formatSeriesData(networth));
      setTotalNetworth(getTotalNetworth());
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  useEffect(() => {
    setTotalNetworth(getTotalNetworth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesData]);

  if (!seriesData) return <p>No Networth</p>;

  return (
    <>
      {/* Show above 768px */}
      <div className='hidden md:grid grid-cols-12'>
        <div
          className={`flex flex-col col-span-8 rounded-s-xl border-r-0 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthSummary
            prevTotal={networth?.prevTotal}
            totalNetworth={totalNetworth}
          />
          <NetworthFilterButtons
            activeFilter={activeFilter}
            handleClick={handleFilterClick}
          />
          <NetworthTable
            isLoading={isLoading}
            seriesData={seriesData}
            totalNetworth={totalNetworth}
          />
        </div>
        <div
          className={`col-span-4 rounded-e-xl dark:bg-dark-1 ${tableClasses}`}
        >
          <h4 className='text-lg font-medium text-black dark:text-gray-2 mb-8'>
            Categories
          </h4>
          <CategoryChart
            totalNetworth={getTotalNetworth()}
            categories={categories}
          />
        </div>
      </div>

      {/* Show below 768px */}
      <div className='grid grid-cols-12 md:hidden'>
        <div
          className={`col-span-12 rounded-xl border-r-1 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthSummary
            prevTotal={networth?.prevTotal}
            totalNetworth={totalNetworth}
          />
          <DashboardTabButtons
            handleTabClick={handleTabClick}
            tabs={['Chart', 'Categories']}
          />
          {activeTab === 'Chart' && (
            <NetworthTable
              seriesData={seriesData}
              totalNetworth={totalNetworth}
            />
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

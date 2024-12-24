'use client';
import dynamic from 'next/dynamic';

import TableHeader from './TableHeader';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const CategoryChart = () => {
  const options = {
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: ['Accounts', 'Stocks', 'Crypto', 'Real Estate', 'Cars', 'Other'],
    fill: {
      colors: [
        '#3E76E0',
        '#77CAF9',
        '#77CAC7',
        '#B564ED',
        '#5F5FDE',
        '#EB4B63',
      ],
    },
  };
  const series = [30, 40, 35, 50, 49, 80];

  return (
    <div className='col-span-4'>
      <TableHeader title='Categories' />
      <div
        id='chartOne'
        className='-ml-5'
      >
        <ApexChart
          options={options}
          series={series}
          type='donut'
          height={350}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default CategoryChart;

'use client';
import dynamic from 'next/dynamic';

import TableHeader from './TableHeader';
import TableContainer from './TableContainer';
import Category from '../Common/Category';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  categories: ICategory[];
}

const CategoryChart = ({ categories }: Props) => {
  const options = {
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: categories.map((category: ICategory) => category.type),
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
    <TableContainer
      colSpan='4'
      classes='rounded-e-xl border-l-0'
    >
      <TableHeader title='Categories' />
      <ApexChart
        options={options}
        series={series}
        type='donut'
        height={200}
        width={'100%'}
      />
      <div className='grid grid-rows-auto grid-cols-3 gap-2'>
        {categories.map((category: ICategory, i: number) => (
          <Category
            key={i}
            category={category}
          />
        ))}
      </div>
    </TableContainer>
  );
};

export default CategoryChart;

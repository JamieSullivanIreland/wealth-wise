'use client';
import dynamic from 'next/dynamic';

import Category from '../Common/Category';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  categories: ICategory[];
}

const CategoryChart = ({ categories }: Props) => {
  const categoryColors: ICategoryColors = {
    accounts: '#3E76E0',
    stocks: '#77CAF9',
    crypto: '#77CAC7',
    realEstate: '#B564ED',
    cars: '#5F5FDE',
    other: '#EB4B63',
  };

  const options = {
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: categories.map((category: ICategory) => category.type),
    fill: {
      colors: Object.values(categoryColors),
    },
  };

  const series = [30, 40, 35, 50, 49, 80];

  return (
    <div className='grid grid-cols-1 gap-8 items-center justify-between justify-items-center'>
      <ApexChart
        options={options}
        series={series}
        type='donut'
        height={250}
        width={'100%'}
      />
      <div className='grid grid-rows-auto grid-cols-3 gap-2 justify-items-center'>
        {categories.map((category: ICategory, i: number) => (
          <Category
            key={i}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;

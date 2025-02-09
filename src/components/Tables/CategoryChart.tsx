'use client';
import dynamic from 'next/dynamic';

import Category from '../Common/Category';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  categories: ICategory[];
  totalNetworth: number;
}

const CategoryChart = ({ categories, totalNetworth }: Props) => {
  const categoryColors: ICategoryColors = {
    accounts: '#3E76E0',
    cars: '#67bc8c',
    crypto: '#77CAF9',
    other: '#EB4B63',
    realEstate: '#B564ED',
    stocks: '#d37d4c',
  };

  const getPercentageValue = (total: number) => {
    return (total / totalNetworth) * 100;
  };

  const getPercentageString = (total: number) => {
    return `${getPercentageValue(total).toFixed(2)}%`;
  };

  const series = categories.map((category: ICategory) => {
    return Number(getPercentageValue(category.total).toFixed(2));
  });

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: categories.map((category: ICategory) => category.name),
    fill: {
      colors: Object.values(categoryColors),
    },
  };

  return (
    <div className='grid grid-cols-1 gap-8 items-center justify-between justify-items-center'>
      <ApexChart
        options={options}
        series={series}
        type='donut'
        height={250}
        width={'100%'}
      />
      <div className='grid grid-rows-auto grid-cols-3 gap-6 justify-items-center'>
        {categories.map((category: ICategory, i: number) => (
          <Category
            key={i}
            name={category.name}
            total={getPercentageString(category.total)}
            colourKey={Object.keys(categoryColors)[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;

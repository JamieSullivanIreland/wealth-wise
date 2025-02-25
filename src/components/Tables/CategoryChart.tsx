'use client';
import dynamic from 'next/dynamic';

import CategoryInfo from '../Common/CategoryInfo';
import { CATEGORIES } from '@/constants';
import { toCamelCase } from '@/utils/string';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  categories: ICategory[];
  totalNetworth: number;
}

const CategoryChart = ({ categories, totalNetworth }: Props) => {
  const categoryColors: ICategories = {
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
      colors: categories.map((category: ICategory) => {
        const key = toCamelCase(category.name) as keyof ICategories;
        return categoryColors[key];
      }),
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
        {Object.values(CATEGORIES).map((v: string, i: number) => {
          const foundCategory = categories.find(
            (c: ICategory) => c.name === v
          );
          const category: ICategory = foundCategory
            ? foundCategory
            : {
                name: CATEGORIES[v as keyof ICategories],
                total: 0,
              };
          return (
            <CategoryInfo
              key={i}
              name={category.name}
              total={getPercentageString(category.total)}
              colourKey={Object.keys(categoryColors)[i]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChart;

'use client';

// import { ApexOptions } from 'apexcharts';
import React from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chartOptions: {
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
  },
};

const CategoryChart = () => {
  const series = [44, 55, 41, 17, 15];

  return (
    <div className='col-span-4'>
      <div
        id='chartOne'
        className='-ml-5'
      >
        <ReactApexChart
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

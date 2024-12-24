'use client';
import dynamic from 'next/dynamic';

import TableHeader from './TableHeader';
import { MONTHS } from '@/constants/date';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const series = [
  {
    name: 'networth',
    data: [
      {
        x: MONTHS[0],
        y: 10,
      },
      {
        x: MONTHS[1],
        y: 75,
      },
      {
        x: MONTHS[2],
        y: 13,
      },
      {
        x: MONTHS[3],
        y: 69,
      },
      {
        x: MONTHS[4],
        y: 18,
      },
      {
        x: MONTHS[5],
        y: 13,
      },
      {
        x: MONTHS[6],
        y: 40,
      },
      {
        x: MONTHS[7],
        y: 50,
      },
      {
        x: MONTHS[8],
        y: 85,
      },
      {
        x: MONTHS[9],
        y: 20,
      },
      {
        x: MONTHS[10],
        y: 18,
      },
      {
        x: MONTHS[11],
        y: 13,
      },
    ],
  },
];

const NetworthTable = () => {
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
      show: true,
    },
    labels: MONTHS,
    fill: {
      colors: ['#2CE48A'],
    },
    plotOptions: {
      bar: {
        borderRadiusApplication: 'end',
        borderRadius: 8,
        columnWidth: '35%',
        colors: {
          backgroundBarColors: ['#2CE48A'],
          backgroundBarOpacity: 0.08,
          backgroundBarRadius: 8,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: { show: false },
    },
    yaxis: {
      opposite: true,
      max: 100,
      labels: {
        show: true,
        align: 'right',
        minWidth: 50,
        maxWidth: 160,
        style: {
          // TODO Change label colour
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
        },
        formatter: (value: number) => {
          return `${value}k`;
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
        },
      },
    },
  };

  return (
    <div className='col-span-8'>
      <TableHeader title='Total Net Worth' />
      <div
        id='chartOne'
        className='-ml-5'
      >
        <ApexChart
          options={options}
          series={series}
          type='bar'
          height={350}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default NetworthTable;

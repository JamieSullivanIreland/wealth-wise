'use client';
import dynamic from 'next/dynamic';

import TableHeader from './TableHeader';
import { MONTHS } from '@/constants/date';
import TableContainer from './TableContainer';
import PillButton from '../Common/PillButton';

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
    <TableContainer
      colSpan='8'
      classes='rounded-s-xl border-r-0'
    >
      <TableHeader title='Total Net Worth' />
      <h4 className='text-4xl font-medium text-black dark:text-white mb-6'>
        €160,000
      </h4>
      <div className='flex gap-2'>
        <PillButton
          text='1 Week'
          onClick={() => console.log('1 Week')}
        />
        <PillButton
          text='1 Month'
          onClick={() => console.log('1 Month')}
        />
        <PillButton
          text='1 Year'
          onClick={() => console.log('1 Year')}
        />
        <PillButton
          text='All'
          onClick={() => console.log('All')}
        />
      </div>
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
    </TableContainer>
  );
};

export default NetworthTable;

'use client';
import dynamic from 'next/dynamic';

import TableHeader from './TableHeader';
import PillButton from '../Common/PillButton';
import Icon from '../Common/Icon';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  networth: INetworth[];
}

const NetworthTable = ({ networth }: IProps) => {
  const getMonth = (monthNum: number) =>
    Intl.DateTimeFormat('en', { month: 'long' })
      .format(new Date(monthNum.toString()))
      .substring(0, 3);

  const getMaxValue = (networth: INetworth[]) => {
    const max = Math.max.apply(
      null,
      networth.map((val: INetworth) => val.total)
    );
    return (max / 100) * 20 + max;
  };

  const series = [
    {
      name: 'networth',
      data: networth.map((value: INetworth) => ({
        x: getMonth(value._id),
        y: value.total,
      })),
    },
  ];

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
    labels: networth.map((value: INetworth) => getMonth(value._id)),
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
      min: 0,
      max: getMaxValue(networth),
      labels: {
        show: true,
        align: 'right',
        minWidth: 50,
        style: {
          // TODO Change label colour
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
        },
        formatter: (value: number) => {
          const str = Math.ceil(value).toString();
          return str.length >= 4
            ? `${str.substring(0, str.length - 3)}k`
            : '0k';
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

  const isPositive = true;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-medium text-black dark:text-gray-3'>
          Total Net Worth
        </h3>
        <div
          className={`p-2 rounded-md flex items-center justify-center text-sm font-medium ${isPositive ? 'bg-dark-green text-light-green' : 'bg-dark-red text-light-red'}`}
        >
          <Icon
            icon={isPositive ? faArrowUp : faArrowDown}
            size='lg'
          />
          <span className='ml-4'>+543.42 (0.18%)</span>
        </div>
      </div>
      <h4 className='text-5xl font-medium text-black dark:text-white mt-4 mb-6'>
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
    </div>
  );
};

export default NetworthTable;

import dynamic from 'next/dynamic';

import Loader from '../Common/Loader';
import { getEuropeanYear } from '@/utils/string';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  isLoading: boolean;
  data: INetworthResult[];
  totalNetworth: number;
  activeFilter: NetworthFilter;
}

const NetworthTable = ({
  isLoading,
  data,
  totalNetworth,
  activeFilter,
}: IProps) => {
  // TODO Fix max value for all filters
  const maxValue = (totalNetworth / 100) * 10 + totalNetworth;
  const series = [
    {
      name: 'networth',
      data: data.map((item: INetworthResult) => item.total),
    },
  ];

  const getDateLabel = (date: string) => {
    const formattedDate = new Date(date.split('/').reverse().join('/'));

    switch (activeFilter) {
      case 'all':
        return Intl.DateTimeFormat('en', { year: 'numeric' }).format(
          formattedDate
        );
      case 'year':
        return `${Intl.DateTimeFormat('en', { month: 'short' }).format(formattedDate)} ${formattedDate.getFullYear().toString().substring(2)}`;
      case 'month':
        return getEuropeanYear(formattedDate);
      case 'week':
        return `${new Intl.DateTimeFormat('en', { weekday: 'short' }).format(formattedDate)} ${formattedDate.getDate()}`;
      default:
        break;
    }
  };

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
    labels: data.map((item: INetworthResult) => getDateLabel(item.date)),
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
      category: 'datetime',
      axisBorder: {
        show: false,
      },
      axisTicks: { show: false },
    },
    yaxis: {
      category: 'numeric',
      opposite: true,
      min: 0,
      max: maxValue,
      labels: {
        show: true,
        align: 'right',
        minWidth: 50,
        style: {
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

  return isLoading ? (
    <Loader isTransparent />
  ) : (
    <div id='chartOne'>
      <ApexChart
        options={options}
        series={series}
        type='bar'
        height={350}
        width={'100%'}
      />
    </div>
  );
};

export default NetworthTable;

import { getEuropeanYear } from '@/utils/string';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  networth: INetworth;
  activeFilter: NetworthFilter;
}

const NetworthTable = ({ networth, activeFilter }: IProps) => {
  const getDateLabel = (networthResullt: INetworthResult) => {
    const { timestamp } = networthResullt;
    const date = new Date(timestamp);

    switch (activeFilter) {
      case 'all':
        return Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      case 'year':
        return Intl.DateTimeFormat('en', { month: 'short' }).format(date);
      case 'month':
        return getEuropeanYear(date);
      case 'week':
        return `${new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)} ${date.getDate()}`;
      default:
        break;
    }
  };

  const getMaxValue = (networth: INetworth) => {
    let max = networth.results[networth.results.length - 1].total;
    if (networth.prevTotal) {
      max += networth.prevTotal;
    }
    return (max / 100) * 10 + max;
  };

  const getValue = (networth: INetworth, total: number) => {
    if (networth.prevTotal) {
      return networth.prevTotal + total;
    }
    return total;
  };

  const series = [
    {
      name: 'networth',
      data: networth.results.map((value: INetworthResult) => ({
        x: getDateLabel(value),
        y: getValue(networth, value.total),
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
    labels: networth.results.map((value: INetworthResult) =>
      getDateLabel(value)
    ),
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

  return (
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
  );
};

export default NetworthTable;

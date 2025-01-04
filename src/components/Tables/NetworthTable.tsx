import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  networth: INetworth[];
  activeFilter: NetworthFilter;
}

const NetworthTable = ({ networth, activeFilter }: IProps) => {
  const getDateLabel = (networthItem: INetworth) => {
    const { _id, timestamp } = networthItem;
    const date = new Date(timestamp);

    switch (activeFilter) {
      case 'all':
        return _id.toString();
      case 'year':
        return Intl.DateTimeFormat('en', { month: 'short' }).format(date);
      case 'month':
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear().toString().substring(0, 2)
        );
      case 'week':
        return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
      default:
        break;
    }
  };

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
        x: getDateLabel(value),
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
    labels: networth.map((value: INetworth) => getDateLabel(value)),
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

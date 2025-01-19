import { getEuropeanYear } from '@/utils/string';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  networth: INetworth;
  activeFilter: NetworthFilter;
}

const NetworthTable = ({ networth, activeFilter }: IProps) => {
  const [seriesData, setSeriesData] = useState<ISeries | undefined>(undefined);

  useEffect(() => {
    setSeriesData(getValues(networth));

    console.log('seriesData');
    console.log(seriesData);
  }, [networth]);

  const getDateLabel = (timestamp: string) => {
    const date = new Date(timestamp.split('/').reverse().join('/'));

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

  const getDateNDaysAgo = (n: number, fromDate: Date) => {
    const date = new Date(fromDate);
    date.setDate(date.getDate() - n);
    return date;
  };

  const getDiffLabel = (diff: number, total: number) => {
    const percent = Math.abs((diff / total) * 100);
    return `${diff > 0 ? '+' : ''}${diff.toFixed(2)} (${percent.toFixed(2)}%)`;
  };

  const getValues = (networth: INetworth) => {
    const numDays = 7;
    const dateObj = {};
    const values = [];

    for (let i = 0; i < numDays; i++) {
      const newDate = getDateNDaysAgo(i, new Date());
      dateObj[newDate.toLocaleDateString()] = {
        total: 0,
        prevDiff: 0,
      };
    }

    networth.results.forEach((result: INetworthResult) => {
      const dateKey = new Date(result.timestamp).toLocaleDateString();

      if (dateObj.hasOwnProperty(dateKey)) {
        dateObj[dateKey] = {
          total: result.total,
          prevDiff: 0,
        };
      }
    });

    let prevTotal = networth.prevTotal;
    Object.entries(dateObj)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, value]) => {
        if (value.total === 0) {
          dateObj[key] = {
            total: prevTotal,
            prevDiff: getDiffLabel(value.total, prevTotal),
          };
        } else {
          const newTotal = prevTotal + value.total;
          dateObj[key] = {
            total: prevTotal + value.total,
            prevDiff: getDiffLabel(value.total, newTotal),
          };
          prevTotal = newTotal;
        }

        values.push({
          x: getDateLabel(key),
          y: dateObj[key].total,
        });
      });

    return values;
  };

  const series = [
    {
      name: 'networth',
      data: seriesData,
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
    labels:
      seriesData && seriesData.length > 0
        ? seriesData.map((data: ISeries) => data.x)
        : [],
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

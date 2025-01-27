import dynamic from 'next/dynamic';
import Loader from '../Common/Loader';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  isLoading: boolean;
  seriesData: ISeries;
  totalNetworth: number;
}

const NetworthTable = ({ isLoading, seriesData, totalNetworth }: IProps) => {
  // TODO Fix max value for all filters
  const maxValue = (totalNetworth / 100) * 10 + totalNetworth;
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
      animations: {
        enabled: false,
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

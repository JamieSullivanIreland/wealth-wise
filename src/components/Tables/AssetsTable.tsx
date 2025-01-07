import { currencyFormat } from '@/utils/string';
import TableHeader from './TableHeader';

interface IProps {
  assets: IAsset[];
}

const AssetsTable = ({ assets }: IProps) => {
  const getPercentage = (value: number, cost: number) => {
    const diff = value - cost;
    const percentage = (diff / cost) * 100;
    return `${percentage.toFixed(0)}%`;
  };

  return (
    <>
      <TableHeader
        title='Assets'
        linkHref='/assets'
        linkText='View All'
      />
      <div className='grid grid-cols-6  mt-4  py-4.5  sm:grid-cols-8 text-sm text-black dark:text-white'>
        <div className='col-span-3 flex items-center'>
          <p className='font-medium'>Type</p>
        </div>
        <div className='col-span-2 hidden items-center sm:flex'>
          <p className='font-medium'>Change</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Cost</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Value</p>
        </div>
      </div>

      {assets.map((asset: IAsset, i: number) => {
        const { category, cost, value } = asset;

        return (
          <div
            className='grid grid-cols-6 py-4.5 sm:grid-cols-8 text-sm text-black dark:text-white'
            key={i}
          >
            <div className='col-span-3 flex items-center'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <p>{category}</p>
              </div>
            </div>
            <div className='col-span-2 hidden items-center sm:flex'>
              <p>{getPercentage(value, cost)}</p>
            </div>
            <div className='col-span-1 flex items-center'>
              <p>{currencyFormat.format(cost)}</p>
            </div>
            <div className='col-span-1 flex items-center'>
              <p>{currencyFormat.format(value)}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AssetsTable;

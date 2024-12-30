import Link from 'next/link';
import TableHeader from './TableHeader';

interface IProps {
  assets: IAsset[];
}

const AssetsTable = ({ assets }: IProps) => {
  const nf = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
  });

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
      <Link href='/assets'>Table</Link>
      <div className='grid grid-cols-6 border-t border-stroke mt-4  py-4.5 dark:border-strokedark sm:grid-cols-8'>
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
        const { category_id, cost, value } = asset;
        return (
          <div
            className='grid grid-cols-6 border-t border-stroke py-4.5 dark:border-strokedark sm:grid-cols-8'
            key={i}
          >
            <div className='col-span-3 flex items-center'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <p className='text-sm text-black dark:text-white'>
                  {category_id}
                </p>
              </div>
            </div>
            <div className='col-span-2 hidden items-center sm:flex'>
              <p className='text-sm text-black dark:text-white'>
                {getPercentage(value, cost)}
              </p>
            </div>
            <div className='col-span-1 flex items-center'>
              <p className='text-sm text-black dark:text-white'>
                {nf.format(cost)}
              </p>
            </div>
            <div className='col-span-1 flex items-center'>
              <p className='text-sm text-black dark:text-white'>
                {nf.format(value)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AssetsTable;

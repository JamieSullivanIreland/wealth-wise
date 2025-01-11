import { currencyFormat } from '@/utils/string';
import TableHeader from './TableHeader';

interface IProps {
  assets: IAsset[];
}

const AssetsTable = ({ assets }: IProps) => {
  return (
    <>
      <TableHeader
        title='Assets'
        linkHref='/assets'
        linkText='View All'
      />
      <div className='grid grid-cols-12 mt-4 py-4.5 text-sm font-medium text-black dark:text-white sm:text-md'>
        <div className='col-span-3 flex sm:col-span-4'>Name</div>
        <div className='col-span-3 flex justify-center sm:col-span-4'>
          Category
        </div>
        <div className='col-span-3 flex justify-center sm:justify-end sm:col-span-2'>
          Cost
        </div>
        <div className='col-span-3 flex justify-end sm:col-span-2'>Value</div>
      </div>

      {assets.map((asset: IAsset, i: number) => {
        const { name, category, cost, value } = asset;

        return (
          <div
            className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white sm:text-sm'
            key={i}
          >
            <div className='col-span-3 flex flex-wrap sm:col-span-4'>
              {name}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center sm:col-span-4'>
              {category}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center sm:justify-end sm:col-span-2'>
              {currencyFormat.format(cost)}
            </div>
            <div className='col-span-3 flex flex-wrap justify-self-end justify-end sm:col-span-2'>
              {currencyFormat.format(value)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AssetsTable;

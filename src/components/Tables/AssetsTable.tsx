import { currencyFormat } from '@/utils/string';

interface IProps {
  assets: IAssetData[];
  showFullData?: boolean;
}

const AssetsTable = ({ assets, showFullData }: IProps) => {
  return showFullData ? (
    <>
      <div className='grid grid-cols-12 mt-4 py-4.5 text-xs font-medium text-black dark:text-white xsm:text-sm'>
        <div className='col-span-3 flex sm:col-span-2 items-center'>Date</div>
        <div className='col-span-3 flex sm:col-span-3 items-center'>Name</div>
        <div className='col-span-3 flex justify-center items-center sm:col-span-2'>
          Category
        </div>
        <div className='col-span-3 flex justify-center items-center sm:col-span-1'>
          Shares
        </div>
        <div className='col-span-3 flex justify-center items-center sm:justify-end sm:col-span-2'>
          Cost
        </div>
        <div className='col-span-3 flex justify-end items-center sm:col-span-2'>
          Value
        </div>
      </div>

      {assets.map((asset: IAssetData, i: number) => {
        const { date, name, category, numShares, cost, value } = asset;
        return (
          <div
            className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white xsm:text-sm'
            key={i}
          >
            <div className='col-span-3 flex flex-wrap items-center sm:col-span-2'>
              {date}
            </div>
            <div className='col-span-3 flex flex-wrap items-center sm:col-span-3'>
              {name}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-2'>
              {category}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-1'>
              {numShares}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center items-center sm:justify-end sm:col-span-2'>
              {currencyFormat.format(cost)}
            </div>
            <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-2'>
              {currencyFormat.format(value)}
            </div>
          </div>
        );
      })}
    </>
  ) : (
    <>
      <div className='grid grid-cols-12 mt-4 py-4.5 text-xs font-medium text-black dark:text-white xsm:text-sm'>
        <div className='col-span-3 flex sm:col-span-4 items-center'>Name</div>
        <div className='col-span-3 flex justify-center items-center sm:col-span-4'>
          Category
        </div>
        <div className='col-span-3 flex justify-center items-center sm:justify-end sm:col-span-2'>
          Cost
        </div>
        <div className='col-span-3 flex justify-end items-center sm:col-span-2'>
          Value
        </div>
      </div>

      {assets.map((asset: IAssetData, i: number) => {
        const { name, category, cost, value } = asset;

        return (
          <div
            className='grid grid-cols-12 py-4.5 text-xs text-black dark:text-white xsm:text-sm'
            key={i}
          >
            <div className='col-span-3 flex flex-wrap items-center sm:col-span-4'>
              {name}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center items-center sm:col-span-4'>
              {category}
            </div>
            <div className='col-span-3 flex flex-wrap justify-center items-center sm:justify-end sm:col-span-2'>
              {currencyFormat.format(cost)}
            </div>
            <div className='col-span-3 flex flex-wrap justify-end items-center sm:col-span-2'>
              {currencyFormat.format(value)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AssetsTable;

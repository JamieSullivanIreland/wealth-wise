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
    <div className='col-span-8 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='px-4 py-6 md:px-6 xl:px-7.5'>
        <h4 className='text-xl font-semibold text-black dark:text-white'>
          Assets
        </h4>
      </div>

      <div className='grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5'>
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
            className='grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5'
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
    </div>
  );
};

export default AssetsTable;
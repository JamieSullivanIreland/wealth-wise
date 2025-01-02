import PageHeader from '../Common/PageHeader';
import AssetsTable from '../Tables/AssetsTable';
import CategoryChart from '../Tables/CategoryChart';
import NetworthTable from '../Tables/NetworthTable';
import TransactionsTable from '../Tables/TransactionsTable';

interface IProps {
  transactions: ITransaction[];
  assets: IAsset[];
  categories: ICategory[];
  networth: INetworth[];
}

const Dashboard = ({ transactions, assets, categories, networth }: IProps) => {
  const tableClasses =
    'px-4 py-6 sm:px-6 sm:py-8 border border-stroke bg-white shadow-default dark:border-strokedark ';

  return (
    <>
      <PageHeader
        title='Dashboard'
        btnText='Add'
      />
      <div className='grid grid-rows-auto grid-cols-1 gap-4'>
        {/* Show above 768px */}
        <div className='hidden md:grid grid-cols-12'>
          <div
            className={`col-span-8 rounded-s-xl border-r-0 dark:bg-dark-3 ${tableClasses}`}
          >
            <NetworthTable networth={networth} />
          </div>
          <div
            className={`col-span-4 rounded-e-xl dark:bg-dark-1 ${tableClasses}`}
          >
            <CategoryChart categories={categories} />
          </div>
        </div>

        {/* Show below 768px */}
        <div className='grid grid-cols-12 md:hidden'>
          <div
            className={`col-span-12 rounded-xl border-r-1 dark:bg-dark-3 ${tableClasses}`}
          >
            <NetworthTable networth={networth} />
          </div>
        </div>

        {/* Show above 1024px */}
        <div className='hidden lg:grid grid-cols-12 gap-4'>
          <div
            className={`col-span-8 rounded-xl dark:bg-dark-4 ${tableClasses}`}
          >
            <AssetsTable assets={assets} />
          </div>
          <div
            className={`col-span-4 rounded-xl dark:bg-dark-4 ${tableClasses}`}
          >
            <TransactionsTable transactions={transactions} />
          </div>
        </div>

        {/* Show below 1024px */}
        <div className='grid grid-cols-12 gap-4 lg:hidden'>
          <div
            className={`col-span-12 rounded-xl dark:bg-dark-4 ${tableClasses}`}
          >
            <AssetsTable assets={assets} />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 lg:hidden'>
          <div
            className={`col-span-12 rounded-xl dark:bg-dark-4 ${tableClasses}`}
          >
            <TransactionsTable transactions={transactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

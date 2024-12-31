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
    'px-4 py-6 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark';

  return (
    <>
      <PageHeader
        title='Dashboard'
        btnText='Add'
      />
      <div className='grid grid-rows-auto grid-cols-1 gap-4'>
        <div className='grid grid-cols-12'>
          <div
            className={`col-span-8  rounded-s-xl border-r-0 ${tableClasses}`}
          >
            <NetworthTable networth={networth} />
          </div>
          <div className={`col-span-4 rounded-e-xl border-l-0 ${tableClasses}`}>
            <CategoryChart categories={categories} />
          </div>
        </div>
        {/* <div className='grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'> */}
        <div className='grid grid-cols-12 gap-4'>
          <div className={`col-span-8 rounded-xl ${tableClasses}`}>
            <AssetsTable assets={assets} />
          </div>
          <div className={`col-span-4 rounded-xl ${tableClasses}`}>
            <TransactionsTable transactions={transactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

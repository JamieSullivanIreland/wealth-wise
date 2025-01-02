import PageHeader from '../Common/PageHeader';
import DashboardBottomSection from '../Sections/DashboardBottomSection';
import DashboardTopSection from '../Sections/DashboardTopSection';
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
      <div className='grid grid-rows-auto grid-cols-1 gap-8 sm:gap-4'>
        <DashboardTopSection
          networth={networth}
          categories={categories}
          tableClasses={tableClasses}
        />
        <DashboardBottomSection
          transactions={transactions}
          assets={assets}
          tableClasses={tableClasses}
        />
      </div>
    </>
  );
};

export default Dashboard;

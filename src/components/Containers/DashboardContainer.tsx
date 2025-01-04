import PageHeader from '../Common/PageHeader';
import DashboardBottom from '../Sections/DashboardBottom';
import DashboardTop from '../Sections/DashboardTop';

interface IProps {
  transactions: ITransaction[];
  assets: IAsset[];
  categories: ICategory[];
}

const Dashboard = ({ transactions, assets, categories }: IProps) => {
  const tableClasses =
    'px-4 py-6 sm:px-6 sm:py-8 border border-stroke bg-white shadow-default dark:border-strokedark ';

  return (
    <>
      <PageHeader
        title='Dashboard'
        btnText='Add'
      />
      <div className='grid grid-rows-auto grid-cols-1 gap-8 sm:gap-4'>
        <DashboardTop
          categories={categories}
          tableClasses={tableClasses}
        />
        <DashboardBottom
          transactions={transactions}
          assets={assets}
          tableClasses={tableClasses}
        />
      </div>
    </>
  );
};

export default Dashboard;

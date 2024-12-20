import AssetsTable from '../Tables/AssetsTable';
import CategoryChart from '../Tables/CategoryChart';
import NetworthTable from '../Tables/NetworthTable';
import TransactionsTable from '../Tables/TransactionsTable';

interface IProps {
  transactions: ITransaction[];
  assets: IAsset[];
}

const Dashboard = ({ transactions, assets }: IProps) => {
  return (
    <>
      <h2>Dashboard</h2>
      <div className='grid grid-rows-auto grid-cols-1 gap-4'>
        <div className='grid grid-cols-12'>
          <NetworthTable />
          <CategoryChart />
        </div>
        {/* <div className='grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'> */}
        <div className='grid grid-cols-12 gap-4'>
          <AssetsTable assets={assets} />
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

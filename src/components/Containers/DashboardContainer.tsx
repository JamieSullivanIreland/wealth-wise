import AssetsTable from '../Tables/AssetsTable';
import TransactionsTable from '../Tables/TransactionsTable';

interface IProps {
  transactions: ITransaction[];
  assets: IAsset[];
}

const Dashboard = ({ transactions, assets }: IProps) => {
  return (
    <div>
      <TransactionsTable transactions={transactions} />
      <AssetsTable assets={assets} />
    </div>
  );
};

export default Dashboard;

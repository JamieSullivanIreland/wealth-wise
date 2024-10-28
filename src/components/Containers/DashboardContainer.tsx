import TransactionsTable from '../Tables/TransactionsTable';

interface IProps {
  transactions: ITransaction[];
}

const Dashboard = ({ transactions }: IProps) => {
  return (
    <div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default Dashboard;

import AssetsTable from '../Tables/AssetsTable';
import TransactionsTable from '../Tables/TransactionsTable';

interface IProps {
  transactions: ITransaction[];
  assets: IAsset[];
  tableClasses: string;
}

const DashboardBottomSection = ({
  transactions,
  assets,
  tableClasses,
}: IProps) => {
  return (
    <>
      {/* Show above 1024px */}
      <div className='hidden 2lg:grid grid-cols-12 gap-4'>
        <div className={`col-span-8 rounded-xl dark:bg-dark-4 ${tableClasses}`}>
          <AssetsTable assets={assets} />
        </div>
        <div className={`col-span-4 rounded-xl dark:bg-dark-4 ${tableClasses}`}>
          <TransactionsTable transactions={transactions} />
        </div>
      </div>

      {/* Show below 1024px */}
      <div className='grid grid-cols-12 gap-4 2lg:hidden'>
        <div
          className={`col-span-12 rounded-xl dark:bg-dark-4 ${tableClasses}`}
        >
          <AssetsTable assets={assets} />
        </div>
      </div>
      <div className='grid grid-cols-12 gap-4 2lg:hidden'>
        <div
          className={`col-span-12 rounded-xl dark:bg-dark-4 ${tableClasses}`}
        >
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default DashboardBottomSection;

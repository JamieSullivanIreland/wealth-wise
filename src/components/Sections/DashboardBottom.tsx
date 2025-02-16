import AssetsTable from '../Tables/AssetsTable';
import TransactionsTable from '../Tables/TransactionsTable';
import TablesContainer from '@/components/Containers/TablesContainer';

interface IProps {
  transactions: ITransaction[];
  assets: IAsset[];
}

const DashboardBottomSection = ({ transactions, assets }: IProps) => {
  const assetsLink: ILink = {
    href: '/assets',
    text: 'View All',
  };
  const transactionsLink: ILink = {
    href: '/transactions',
    text: 'View All',
  };

  return (
    <>
      {/* Show above 1024px */}
      <div className='hidden 2lg:grid grid-cols-12 gap-4'>
        <TablesContainer
          title='Assets'
          link={assetsLink}
          classes='col-span-8 rounded-xl dark:bg-dark-4'
        >
          <AssetsTable assets={assets} />
        </TablesContainer>
        <TablesContainer
          title='Transactions'
          link={transactionsLink}
          classes='col-span-4 rounded-xl dark:bg-dark-4'
        >
          <TransactionsTable transactions={transactions} />
        </TablesContainer>
      </div>

      {/* Show below 1024px */}
      <div className='grid grid-cols-12 gap-4 2lg:hidden'>
        <TablesContainer
          title='Assets'
          link={assetsLink}
          classes='col-span-12 rounded-xl dark:bg-dark-4'
        >
          <AssetsTable assets={assets} />
        </TablesContainer>
      </div>
      <div className='grid grid-cols-12 gap-4 2lg:hidden'>
        <TablesContainer
          title='Transactions'
          link={transactionsLink}
          classes='col-span-12 rounded-xl dark:bg-dark-4'
        >
          <TransactionsTable transactions={transactions} />
        </TablesContainer>
      </div>
    </>
  );
};

export default DashboardBottomSection;

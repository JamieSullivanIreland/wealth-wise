import Layout from '@/components/Layout/Layout';
import DashboardContainer from '@/components/Containers/DashboardContainer';
import { getAssets, getTransactions } from '@/utils/api';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Wise',
  description: 'This is Wealth Wise',
};

export default async function Home() {
  const transactions: ITransaction[] = await getTransactions();
  const assets: IAsset[] = await getAssets();

  return (
    <>
      <Layout>
        <DashboardContainer
          transactions={transactions}
          assets={assets}
        />
      </Layout>
    </>
  );
}

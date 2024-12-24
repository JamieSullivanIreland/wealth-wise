import Layout from '@/components/Layout/Layout';
import DashboardContainer from '@/components/Containers/DashboardContainer';
import { getAssets, getCategories, getTransactions } from '@/utils/api';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Wise',
  description: 'This is Wealth Wise',
};

export default async function Home() {
  // Wait 1 second to access local storage theme
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const transactionsData = getTransactions();
  const assetsData = getAssets();
  const categoriesData = getCategories();

  const [transactions, assets, categories] = await Promise.all([
    transactionsData,
    assetsData,
    categoriesData,
  ]);

  return (
    <>
      <Layout>
        <DashboardContainer
          transactions={transactions}
          assets={assets}
          categories={categories}
        />
      </Layout>
    </>
  );
}

import Layout from '@/components/Layout/Layout';
import DashboardContainer from '@/components/Containers/DashboardContainer';

import type { Metadata } from 'next';
import connectDB from '../../config/database';
import Transaction from '../../models/Transaction';

export const metadata: Metadata = {
  title: 'Wealth Wise',
  description: 'This is Wealth Wise',
};

export default async function Home() {
  await connectDB();
  const transactions = await Transaction.find({}).lean();
  console.log(transactions);

  return (
    <>
      <Layout>
        <DashboardContainer />
      </Layout>
    </>
  );
}

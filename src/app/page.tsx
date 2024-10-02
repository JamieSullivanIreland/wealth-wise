import Layout from '@/components/Layout/Layout';
import Dashboard from '@/components/Dashboard/Dashboard';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Wise',
  description: 'This is Wealth Wise',
};

export default function Home() {
  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
}

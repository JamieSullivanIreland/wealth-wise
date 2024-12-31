import Layout from '@/components/Layout/Layout';
import TablesContainer from '@/components/Containers/TablesContainer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Wise',
  description: 'This is Wealth Wise',
};

export default function Assets() {
  return (
    <>
      <Layout>
        <TablesContainer title='Assets Table' />
      </Layout>
    </>
  );
}

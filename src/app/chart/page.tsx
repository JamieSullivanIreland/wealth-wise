import Layout from '@/components/Layout/Layout';
import ChartContainer from '@/components/Containers/ChartContainer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Wise',
  description: 'This is Wealth Wise',
};

export default function Chart() {
  return (
    <>
      <Layout>
        <ChartContainer />
      </Layout>
    </>
  );
}

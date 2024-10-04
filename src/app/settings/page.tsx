import Layout from '@/components/Layout/Layout';
import SettingsContainer from '@/components/Containers/SettingsContainer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Wise',
  description: 'This is Wealth Wise',
};

export default function Settings() {
  return (
    <>
      <Layout>
        <SettingsContainer />
      </Layout>
    </>
  );
}

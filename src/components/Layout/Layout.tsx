'use client';

import { ReactNode, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className='flex'>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className='relative flex flex-1 flex-col lg:ml-72.5'>
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;

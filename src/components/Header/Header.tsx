'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DarkModeSwitcher from './DarkModeSwitcher';
import User from './User';
import HamburgerButton from './HamburgerButton';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import ProfileImage from './ProfileImage';

interface IProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: IProps) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <header className='sticky top-0 z-999 bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
      <div className='flex flex-grow items-center shadow-2 px-4 py-4 md:px-6 2xl:px-11'>
        <div className='flex items-center justify-between  w-full sm:hidden'>
          <HamburgerButton
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Link
            className='block flex-shrink-0'
            href='/'
          >
            {session?.user?.image && (
              <ProfileImage imgUrl={session.user.image} />
            )}
          </Link>
        </div>

        <div className='hidden sm:flex w-full items-center justify-between'>
          <DarkModeSwitcher />

          {session ? (
            <User session={session} />
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className='rounded-lg border border-stroke bg-gray py-4 px-8 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50'
              >
                Sign in
              </button>
            ))
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

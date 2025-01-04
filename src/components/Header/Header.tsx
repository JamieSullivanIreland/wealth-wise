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
import Button from '../Common/Button';

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
    <header className='sticky top-0 z-999 bg-white drop-shadow-1 dark:bg-dark-3 dark:drop-shadow-none'>
      <div className='flex flex-grow items-center shadow-2 px-4 py-4 md:px-6 2xl:px-11'>
        <div className='flex items-center justify-between w-full sm:hidden'>
          <HamburgerButton
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Link
            className='text-md font-medium rounded-md bg-black text-white hover:bg-opacity-50 dark:text-black dark:bg-gray-1 dark:hover:bg-opacity-75'
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
              <Button
                key={provider.id}
                text='Sign in'
                onClick={() => signIn(provider.id)}
              />
            ))
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

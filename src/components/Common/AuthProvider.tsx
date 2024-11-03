'user client';

import { SessionProvider } from 'next-auth/react';

interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;

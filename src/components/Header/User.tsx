import ProfileImage from './ProfileImage';

import { Session } from 'next-auth';

interface IProps {
  session: Session;
}

const User = ({ session }: IProps) => {
  const { user } = session;

  return (
    <div className='flex gap-2 items-center'>
      <span className='text-sm font-medium text-black dark:text-white'>
        {user?.name}
      </span>
      {user?.image && <ProfileImage imgUrl={user.image} />}
    </div>
  );
};

export default User;

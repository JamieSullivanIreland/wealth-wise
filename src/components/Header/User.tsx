import ProfileImage from './ProfileImage';

interface IProps {
  user: SessionUser;
}

const User = ({ user }: IProps) => {
  const { name, image } = user;

  return (
    <div className='flex gap-2 items-center'>
      <span className='text-sm font-medium text-black dark:text-white'>
        {name}
      </span>
      {image && <ProfileImage imgUrl={image} />}
    </div>
  );
};

export default User;

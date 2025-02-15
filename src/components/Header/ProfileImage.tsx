import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';

interface IProps {
  imgUrl: string;
}

const ProfileImage = ({ imgUrl }: IProps) => (
  <Image
    className='rounded-full'
    width={36}
    height={36}
    src={imgUrl || profileDefault}
    alt='Google User Image'
  />
);

export default ProfileImage;

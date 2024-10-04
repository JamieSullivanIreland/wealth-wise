import Image from 'next/image';

const User = () => {
  return (
    <>
      <span className='hidden text-right lg:block'>
        <span className='block text-sm font-medium text-black dark:text-white'>
          Thomas Anree
        </span>
        <span className='block text-xs'>UX Designer</span>
      </span>

      <span className='h-12 w-12 rounded-full'>
        <Image
          width={112}
          height={112}
          src={'/images/user/user-01.png'}
          style={{
            width: 'auto',
            height: 'auto',
          }}
          alt='User'
        />
      </span>
    </>
  );
};

export default User;

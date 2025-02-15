'use client';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface Props {
  title: string;
  btnText?: string;
}

const PageHeader = ({ title, btnText }: Props) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='text-3xl font-medium text-black dark:text-gray-2'>
        {title}
      </h2>
      {btnText && (
        <Button
          text={btnText}
          onClick={() => {
            console.log('Add');
          }}
          icon={faPlus}
          iconSize='lg'
        />
      )}
    </div>
  );
};

export default PageHeader;

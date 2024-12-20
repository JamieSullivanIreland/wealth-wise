'use client';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';
import Button from './Button';

interface Props {
  title: string;
  btnText?: string;
}

const PageHeader = ({ title, btnText }: Props) => {
  return (
    <div className='flex justify-between items-center mb-8'>
      <h2 className='text-3xl font-medium text-black dark:text-white'>
        {title}
      </h2>
      {btnText && (
        <Button
          text='Add'
          onClick={() => {
            console.log('Add');
          }}
          icon={faPlus}
          iconSize='xl'
          iconColor='#313d4a'
        />
      )}
    </div>
  );
};

export default PageHeader;

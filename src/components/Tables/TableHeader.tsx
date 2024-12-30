'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import Icon from '../Common/Icon';

interface Props {
  title: string;
  linkHref?: string;
  linkText?: string;
}

const TableHeader = ({ title, linkHref, linkText }: Props) => {
  return (
    <div className='flex justify-between items-center mb-8'>
      <h4 className='text-xl font-medium text-black dark:text-white mb-2'>
        {title}
      </h4>
      {linkHref && linkText && (
        <Link
          href={linkHref}
          className={`flex gap-2 justify-between items-center text-md font-medium py-2 px-4 rounded-md border  border-stroke bg-gray hover:bg-opacity-50 dark:border-strokedark dark:bg-gray dark:hover:bg-opacity-75 dark:text-black`}
        >
          {linkText}
          <Icon
            icon={faArrowRight}
            size='xl'
            color='#313d4a'
          />
        </Link>
      )}
      {/* {btnText && (
        <Button
          text={btnText}
          onClick={() => {
            console.log('View All');
          }}
          btnSize='sm'
          icon={faArrowRight}
          iconSize='lg'
          iconColor='#313d4a'
          iconAlign='right'
        />
      )} */}
    </div>
  );
};

export default TableHeader;

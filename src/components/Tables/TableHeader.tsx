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
      <h4 className='text-sm xsm:text-lg font-medium text-black dark:text-gray-2 mb-2'>
        {title}
      </h4>
      {linkHref && linkText && (
        <Link
          href={linkHref}
          className={`flex gap-2 justify-between items-center text-md font-medium py-2 px-4 rounded-md bg-black text-white hover:bg-opacity-50 dark:text-black dark:bg-gray-1 dark:hover:bg-opacity-75`}
        >
          {linkText}
          <Icon
            icon={faArrowRight}
            size='lg'
          />
        </Link>
      )}
    </div>
  );
};

export default TableHeader;

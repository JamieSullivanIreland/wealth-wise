'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import Icon from '../Common/Icon';

interface Props {
  title?: string;
  link?: ILink;
}

const TableHeader = ({ title, link }: Props) => {
  return (
    <div className={`flex justify-between items-center ${link ? 'mb-8' : ''}`}>
      {title && (
        <h4 className='text-sm xsm:text-lg font-medium text-black dark:text-gray-2'>
          {title}
        </h4>
      )}
      {link && (
        <Link
          href={link.href}
          className={`flex gap-2 justify-between items-center text-md font-medium py-2 px-4 rounded-md bg-black text-white hover:bg-opacity-50 dark:text-black dark:bg-gray-1 dark:hover:bg-opacity-75`}
        >
          {link.text}
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

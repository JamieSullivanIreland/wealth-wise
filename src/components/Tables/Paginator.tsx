import { clsx } from 'clsx/lite';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Common/Icon';

interface IProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: () => void;
}

const Paginator = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: IProps) => {
  const baseClasses = clsx(
    'relative hidden items-center px-4 py-2 text-sm border border-stroke  dark:border-strokedark focus:z-20 focus:outline-offset-0 md:inline-flex'
  );
  const textClasses = clsx(
    'bg-white text-black dark:bg-transparent dark:text-white'
  );
  const hoverClasses = clsx(
    'hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black'
  );

  const maxVisible = 5;
  const jumpAmount = 3;

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= maxVisible) {
      pages = Array.from(
        { length: totalPages },
        (v: undefined, i: number) => i + 1
      );
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }
    return pages;
  };

  return (
    <div className='flex items-center justify-between pt-4 text-white'>
      {/* mobile */}
      {/* <div className='flex flex-1 justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </a>
        <a
          href='#'
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </a>
      </div> */}
      {/* mobile */}
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-black dark:text-white'>
            {`Showing ${currentPage} to ${totalPages} of ${totalItems} results`}
          </p>
        </div>
        <div>
          <nav
            className='inline-flex -space-x-px rounded-md shadow-xs'
            aria-label='Pagination'
          >
            <button
              className={`rounded-l-md ${baseClasses} ${textClasses} ${hoverClasses}`}
            >
              <Icon icon={faAngleLeft} />
            </button>

            {getPageNumbers().map((page: string | number, i: number) => {
              return page === '...' ? (
                <button
                  key={i}
                  onClick={onPageChange}
                  className={`${baseClasses} ${textClasses} ${hoverClasses}`}
                >
                  ...
                </button>
              ) : (
                <button
                  key={i}
                  onClick={onPageChange}
                  className={`${currentPage === page ? 'bg-primary text-white dark:bg-white dark:text-black' : `${textClasses} ${hoverClasses}`} ${baseClasses}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              className={`rounded-r-md ${baseClasses} ${textClasses} ${hoverClasses}`}
            >
              <Icon icon={faAngleRight} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Paginator;

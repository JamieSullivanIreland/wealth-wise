import { clsx } from 'clsx/lite';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Common/Icon';
import DropdownList from '../Common/DropdownList';

interface IProps {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (limit: string) => void;
}

const Paginator = ({
  totalCount,
  totalPages,
  currentPage,
  limit,
  onPageChange,
  onLimitChange,
}: IProps) => {
  const baseClasses = clsx(
    'relative hidden items-center px-4 py-2 text-sm border border-stroke  dark:border-strokedark focus:z-20 focus:outline-offset-0 md:inline-flex'
  );
  const textClasses = clsx(
    'bg-white text-black dark:bg-transparent dark:text-white'
  );
  const hoverClasses = clsx(
    'hover:bg-gray-1 dark:hover:bg-white dark:hover:text-black'
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
            {`Showing ${currentPage} to ${totalPages} of ${totalCount} results`}
          </p>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <DropdownList
            heading={`Show ${limit} results`}
            labels={['5', '10', '20']}
            onClick={onLimitChange}
          />
          <nav
            className='inline-flex -space-x-px rounded-md shadow-xs'
            aria-label='Pagination'
          >
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className={`rounded-l-md ${baseClasses} ${currentPage > 1 ? `${textClasses} ${hoverClasses}` : 'text-gray-4 cursor-default'}`}
            >
              <Icon icon={faAngleLeft} />
            </button>

            {getPageNumbers().map((page: string | number, i: number) => {
              return page === '...' ? (
                <button
                  key={i}
                  onClick={() =>
                    onPageChange(
                      i === 1
                        ? currentPage - jumpAmount
                        : currentPage + jumpAmount
                    )
                  }
                  className={`${baseClasses} ${textClasses} ${hoverClasses}`}
                >
                  ...
                </button>
              ) : (
                <button
                  key={i}
                  disabled={currentPage === page}
                  onClick={() => onPageChange(Number(page))}
                  className={`${currentPage === page ? 'bg-primary text-white dark:bg-white dark:text-black cursor-default' : `${textClasses} ${hoverClasses}`} ${baseClasses}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className={`rounded-r-md ${baseClasses} ${currentPage < totalPages ? `${textClasses} ${hoverClasses}` : 'text-gray-4 cursor-default'}`}
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

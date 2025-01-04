import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';

interface IProps {
  isPositive: boolean;
}

const NetworthSummary = ({ isPositive }: IProps) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-medium text-black dark:text-gray-3'>
          Total Net Worth
        </h3>
        <div
          className={`py-2 px-4 rounded-md flex items-center justify-center text-md font-medium border border-stroke dark:border-0 ${isPositive ? 'bg-gray-1 text-mid-green dark:bg-dark-green dark:text-light-green' : 'dark:bg-dark-red dark:text-light-red'}`}
        >
          <Icon
            icon={isPositive ? faArrowUp : faArrowDown}
            size='lg'
          />
          <span className='ml-4'>+543.42 (0.18%)</span>
        </div>
      </div>
      <h4 className='text-5xl font-medium text-black dark:text-white mt-4 mb-6'>
        €160,000
      </h4>
    </>
  );
};

export default NetworthSummary;

import {
  faArrowDown,
  faArrowUp,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';

interface IProps {
  prevTotal?: number;
  totalNetworth: number;
}

const NetworthSummary = ({ prevTotal, totalNetworth }: IProps) => {
  const diff = totalNetworth - (prevTotal || 0);
  const valueLabel = `${diff > 0 ? '+' : ''}${diff.toFixed(2)} (${Math.abs((diff / totalNetworth) * 100).toFixed(2)}%)`;

  const getIcon = (total: number) => {
    if (total === 0) {
      return faMinus;
    }
    if (total > 0) {
      return faArrowUp;
    }
    return faArrowDown;
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-medium text-black dark:text-gray-3'>
          Total Net Worth
        </h3>
        <div
          className={`py-2 px-4 rounded-md flex items-center justify-center text-md font-medium border border-stroke dark:border-0 ${diff > 0 && 'bg-gray-1 text-mid-green dark:bg-dark-green dark:text-light-green'} ${diff < 0 && 'dark:bg-dark-red dark:text-light-red'} ${diff === 0 && 'bg-gray-1 text-black '}`}
        >
          <Icon
            icon={getIcon(diff)}
            size='lg'
          />
          <span className='ml-4'>{valueLabel}</span>
        </div>
      </div>
      <h4 className='text-5xl font-medium text-black dark:text-white mt-4 mb-6'>
        €160,000
      </h4>
    </>
  );
};

export default NetworthSummary;

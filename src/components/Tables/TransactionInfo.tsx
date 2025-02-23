import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Common/Icon';
import { currencyFormat } from '@/utils/string';

interface IProps {
  amount: number;
  assetName?: string;
}

const TransactionInfo = ({ amount, assetName }: IProps) => {
  const isPositive = amount > 0;

  return (
    <>
      <div className='col-span-2 xsm:col-span-1 flex items-center 2lg:col-span-2 2lg:justify-start'>
        {
          <div
            className={`h-8 min-w-8 xsm:h-10 xsm:min-w-10 rounded-md flex items-center justify-center text-xl border border-stroke dark:border-0 ${isPositive ? 'bg-gray-1 text-mid-green dark:bg-dark-green dark:text-light-green' : 'bg-gray-1 text-mid-red dark:bg-dark-red dark:text-light-red'} 2lg:h-8 2lg:min-w-8`}
          >
            <span className='hidden xsm:flex 2lg:hidden'>
              <Icon icon={isPositive ? faArrowUp : faArrowDown} />
            </span>
            <span className='flex xsm:hidden 2lg:flex'>
              <Icon
                icon={isPositive ? faArrowUp : faArrowDown}
                size='sm'
              />
            </span>
          </div>
        }
      </div>
      <div className='gap-1 text-xs col-span-8 xsm:col-start-2 xsm:col-span-2 flex flex-col xsm:flex-row justify-center xsm:text-sm xsm:items-center xsm:justify-start 2lg:col-span-8 2lg:flex-col 2lg:items-start'>
        <span
          className={`${
            isPositive
              ? 'text-mid-green dark:text-light-green'
              : 'text-mid-red dark:text-light-red'
          } font-medium `}
        >
          {currencyFormat.format(amount)}
        </span>
        {assetName && (
          <span className='flex xsm:hidden col-span-3 2lg:flex'>
            {assetName}
          </span>
        )}
      </div>
    </>
  );
};

export default TransactionInfo;

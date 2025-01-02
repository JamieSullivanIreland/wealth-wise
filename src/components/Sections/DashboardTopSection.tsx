import CategoryChart from '../Tables/CategoryChart';
import NetworthTable from '../Tables/NetworthTable';

interface IProps {
  networth: INetworth[];
  categories: ICategory[];
  tableClasses: string;
}

const DashboardTopSection = ({
  networth,
  categories,
  tableClasses,
}: IProps) => {
  return (
    <>
      {/* Show above 768px */}
      <div className='hidden md:grid grid-cols-12'>
        <div
          className={`col-span-8 rounded-s-xl border-r-0 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthTable networth={networth} />
        </div>
        <div
          className={`col-span-4 rounded-e-xl dark:bg-dark-1 ${tableClasses}`}
        >
          <CategoryChart categories={categories} />
        </div>
      </div>

      {/* Show below 768px */}
      <div className='grid grid-cols-12 md:hidden'>
        <div
          className={`col-span-12 rounded-xl border-r-1 dark:bg-dark-3 ${tableClasses}`}
        >
          <NetworthTable networth={networth} />
        </div>
      </div>
    </>
  );
};

export default DashboardTopSection;

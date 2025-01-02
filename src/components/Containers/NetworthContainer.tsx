import NetworthSummary from '../Sections/NetworthSummary';
import PillButton from '../Common/PillButton';
import NetworthTable from '../Tables/NetworthTable';

interface IProps {
  networth: INetworth[];
}

const NetworthContainer = ({ networth }: IProps) => {
  return (
    <>
      <NetworthSummary isPositive={true} />
      <div className='hidden sm:flex gap-2'>
        <PillButton
          text='1 Week'
          onClick={() => console.log('1 Week')}
        />
        <PillButton
          text='1 Month'
          onClick={() => console.log('1 Month')}
        />
        <PillButton
          text='1 Year'
          onClick={() => console.log('1 Year')}
        />
        <PillButton
          text='All'
          onClick={() => console.log('All')}
        />
      </div>
      <div className='flex sm:hidden gap-2'>
        <PillButton
          text='Chart'
          onClick={() => console.log('Chart')}
        />
        <PillButton
          text='Categories'
          onClick={() => console.log('Categories')}
        />
      </div>
      <NetworthTable networth={networth} />
    </>
  );
};

export default NetworthContainer;

import PillButton from '../Common/PillButton';

const NetworthFilterButtons = () => {
  return (
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
  );
};

export default NetworthFilterButtons;

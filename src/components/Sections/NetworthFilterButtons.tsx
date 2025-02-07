import PillButton from '../Common/PillButton';

interface IProps {
  activeFilter: NetworthFilter;
  handleClick: (filter: NetworthFilter) => void;
}

const NetworthFilterButtons = ({ activeFilter, handleClick }: IProps) => {
  return (
    <div className='flex gap-2'>
      <PillButton
        text='1 Week'
        isActive={activeFilter === 'week'}
        onClick={() => {
          handleClick('week');
        }}
      />
      <PillButton
        text='1 Month'
        isActive={activeFilter === 'month'}
        onClick={() => {
          handleClick('month');
        }}
      />
      <PillButton
        text='1 Year'
        isActive={activeFilter === 'year'}
        onClick={() => {
          handleClick('year');
        }}
      />
      <PillButton
        text='All'
        isActive={activeFilter === 'all'}
        onClick={() => {
          handleClick('all');
        }}
      />
    </div>
  );
};

export default NetworthFilterButtons;

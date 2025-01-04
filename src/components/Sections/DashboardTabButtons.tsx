import PillButton from '../Common/PillButton';

interface IProps {
  handleTabClick?: (tab: DashboardTab) => void;
  tabs?: DashboardTab[];
}

const DashboardTabButtons = ({ handleTabClick, tabs }: IProps) => {
  return (
    <div className='flex md:hidden gap-2'>
      {tabs?.map((tab: DashboardTab) => (
        <PillButton
          key={tab}
          text={tab}
          onClick={() => {
            handleTabClick?.(tab);
          }}
        />
      ))}
    </div>
  );
};

export default DashboardTabButtons;

interface Props {
  title: string;
}

const TableHeader = ({ title }: Props) => {
  return (
    <h4 className='text-xl font-medium text-black dark:text-white'>{title}</h4>
  );
};

export default TableHeader;

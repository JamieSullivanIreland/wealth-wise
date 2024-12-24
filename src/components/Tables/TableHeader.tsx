interface Props {
  title: string;
}

const TableHeader = ({ title }: Props) => {
  return (
    <h4 className='text-xl font-medium text-black dark:text-white mb-2'>
      {title}
    </h4>
  );
};

export default TableHeader;

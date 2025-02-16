import { ReactNode } from 'react';
import TableHeader from '../Tables/TableHeader';

interface IProps {
  children: ReactNode;
  title?: string;
  link?: ILink;
  classes?: string;
}

const TablesContainer = ({ children, title, link, classes }: IProps) => {
  return (
    <div
      className={`px-4 py-6 sm:px-6 sm:py-8 border border-stroke bg-white shadow-default dark:border-strokedark ${classes}`}
    >
      <TableHeader
        title={title}
        link={link}
      />
      {children}
    </div>
  );
};

export default TablesContainer;

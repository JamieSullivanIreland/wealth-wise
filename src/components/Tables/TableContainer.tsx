import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  colSpan: string;
  classes?: string;
}

const TableContainer = ({ children, colSpan, classes = '' }: Props) => {
  return (
    <div
      className={`col-span-${colSpan} px-4 py-6 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${classes}`}
    >
      {children}
    </div>
  );
};

export default TableContainer;

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IMenuItem } from '@/types/menu';

interface IProps {
  item: IMenuItem;
  pageName?: string;
  setPageName?: (pageName: string) => void;
  onClick?: () => void;
}

const SidebarItem = ({ item, pageName, setPageName, onClick }: IProps) => {
  const pathname = usePathname();
  const isItemActive = item.route === pathname;
  const classes = `${isItemActive ? 'bg-graydark dark:bg-sidebar-dark' : ''} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-sidebar-dark w-full`;

  const handleSetPageName = () => {
    if (setPageName) {
      const updatedPageName =
        pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : '';
      return setPageName(updatedPageName);
    }
  };

  return (
    <li className='mb-1'>
      {onClick ? (
        <button
          onClick={onClick}
          className={classes}
        >
          {item.icon}
          {item.label}
        </button>
      ) : (
        <Link
          href={item.route}
          onClick={handleSetPageName}
          className={classes}
        >
          <span>{item.icon}</span>
          {item.label}
        </Link>
      )}
    </li>
  );
};

export default SidebarItem;

import {
  faArrowRightFromBracket,
  faChartPie,
  faTable,
  faBorderAll,
  faExchange,
  faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons';

import Icon from '@/components/Common/Icon';
import { IMenuItem } from '@/types/menu';

export const MENU_ITEMS: IMenuItem[] = [
  {
    icon: (
      <Icon
        icon={faBorderAll}
        size='lg'
      />
    ),
    label: 'Dashboard',
    route: '/',
  },
  {
    icon: (
      <Icon
        icon={faMoneyBill1Wave}
        size='lg'
      />
    ),
    label: 'Assets',
    route: '/assets',
  },
  {
    icon: (
      <Icon
        icon={faExchange}
        size='lg'
      />
    ),
    label: 'Transactions',
    route: '/transactions',
  },
  {
    icon: (
      <Icon
        icon={faChartPie}
        size='lg'
      />
    ),
    label: 'Chart',
    route: '/chart',
  },
  {
    icon: (
      <Icon
        icon={faTable}
        size='lg'
      />
    ),
    label: 'Tables',
    route: '/tables',
  },
  {
    icon: (
      <Icon
        icon={faArrowRightFromBracket}
        size='lg'
      />
    ),
    label: 'Log Out',
    route: '/logout',
  },
];

export const CATEGORIES = {
  accounts: 'Accounts',
  cars: 'Cars',
  crypto: 'Crypto',
  other: 'Other',
  realEstate: 'Real Estate',
  stocks: 'Stocks',
};

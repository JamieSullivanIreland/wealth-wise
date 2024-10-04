import {
  faArrowRightFromBracket,
  faGear,
  faChartPie,
  faTable,
  faBorderAll,
} from '@fortawesome/free-solid-svg-icons';

import Icon from '@/components/Common/Icon';
import { IMenuItem } from '@/types/menu';

export const MENU_ITEMS: IMenuItem[] = [
  {
    icon: <Icon icon={faBorderAll} />,
    label: 'Dashboard',
    route: '/',
  },
  {
    icon: <Icon icon={faChartPie} />,
    label: 'Chart',
    route: '/chart',
  },

  {
    icon: <Icon icon={faTable} />,
    label: 'Tables',
    route: '/tables',
  },
  {
    icon: <Icon icon={faGear} />,
    label: 'Settings',
    route: '/settings',
  },
  {
    icon: <Icon icon={faArrowRightFromBracket} />,
    label: 'Log Out',
    route: '/logout',
  },
];

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
        icon={faGear}
        size='lg'
      />
    ),
    label: 'Settings',
    route: '/settings',
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

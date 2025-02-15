import { ReactElement } from 'react';

declare interface IMenuChildren {
  label: string;
  route: string;
}

declare interface IMenuItem {
  icon: ReactElement;
  label: string;
  route: string;
  children?: IMenuChildren[];
}


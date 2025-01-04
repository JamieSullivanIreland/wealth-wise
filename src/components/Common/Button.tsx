'use client';

import Icon from './Icon';

import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

type BtnSize = 'sm' | 'lg';
type BtnType = 'button' | 'submit' | 'reset' | undefined;
type BtnIconAlign = 'left' | 'right' | undefined;

interface Props {
  text: string;
  type?: BtnType;
  onClick: () => void;
  btnSize?: BtnSize;
  icon?: IconDefinition;
  iconSize?: SizeProp;
  iconColor?: string;
  iconAlign?: BtnIconAlign;
  isLink?: boolean;
}

const Button = ({
  text,
  type = 'button',
  onClick,
  btnSize = 'lg',
  icon,
  iconSize,
  iconAlign,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md border border-stroke bg-black text-white hover:bg-opacity-50 dark:border-strokedark dark:text-black dark:bg-gray-1 dark:hover:bg-opacity-75  ${icon ? 'flex gap-2 justify-between items-center ' : ''} ${btnSize === 'lg' ? 'text-lg font-medium py-2 px-4' : 'text-md font-medium py-2 px-4'} `}
      style={{ color: '' }}
    >
      {icon && iconAlign !== 'right' && (
        <Icon
          icon={icon}
          size={iconSize}
        />
      )}
      {text}
      {icon && iconAlign === 'right' && (
        <Icon
          icon={icon}
          size={iconSize}
        />
      )}
    </button>
  );
};

export default Button;

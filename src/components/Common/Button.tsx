'use client';

import Icon from './Icon';

import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

type BtnType = 'button' | 'submit' | 'reset' | undefined;

interface Props {
  text: string;
  type?: BtnType;
  onClick: () => void;
  icon?: IconDefinition;
  iconSize?: SizeProp;
  iconColor?: string;
}

const Button = ({
  text,
  type = 'button',
  onClick,
  icon,
  iconSize,
  iconColor,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${icon ? 'flex gap-2 justify-between items-center ' : ''}rounded-md border text-lg font-medium border-stroke bg-gray py-2 px-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-gray dark:hover:bg-opacity-75 dark:text-black`}
    >
      {icon && (
        <Icon
          icon={icon}
          size={iconSize}
          color={iconColor}
        />
      )}
      {text}
    </button>
  );
};

export default Button;

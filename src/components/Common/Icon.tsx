import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

export interface Props {
  icon: IconDefinition;
  colour?: string;
  size?: SizeProp;
}

const Icon = ({ icon, colour, size }: Props) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
    />
  );
};

export default Icon;

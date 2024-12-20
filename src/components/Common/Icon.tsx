import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface Props {
  icon: IconDefinition;
  color?: string;
  size?: SizeProp;
}

const Icon = ({ icon, color, size }: Props) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      color={color}
    />
  );
};

export default Icon;

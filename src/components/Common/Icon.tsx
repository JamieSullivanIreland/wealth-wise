import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface Props {
  icon: IconDefinition;
  colour?: string;
  size?: string;
}

const Icon = ({ icon, colour, size }: Props) => {
  return <FontAwesomeIcon icon={icon} />;
};

export default Icon;

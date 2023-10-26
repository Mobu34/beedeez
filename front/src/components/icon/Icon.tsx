import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IIconProps } from './icon.d';

const Icon: FC<IIconProps> = ({ icon, size = '1x', color = 'black' }) => {
  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
};

export default Icon;

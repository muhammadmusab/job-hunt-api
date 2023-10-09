import { classNames } from '@codelab/lib';
import { ClLabel, ILabelProps } from '@codelab/ui';
import React from 'react';

import classes from './customRadioLabel.module.scss'
const CustomRadioLabel = ({ htmlFor, children,className = '', ...rest }: ILabelProps) => {
  return (
    <ClLabel className={classNames(classes['custom-label'],className)} htmlFor={htmlFor} {...rest}>
      {children}
    </ClLabel>
  );
};

export default CustomRadioLabel;

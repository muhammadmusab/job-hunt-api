import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { Variant } from '../../types/general';

import { classNames } from '@codelab/lib';

interface IProps extends Progress.ProgressProps {
  progress?: number;
  variant?: Variant;
  sm?:boolean;
  showPercentage?:boolean
}

export const ClProgress = ({className = '', showPercentage  = false,sm = false,progress = 0, variant = 'primary', ...rest }: IProps) => {
  const classes = classNames('progress',sm ? 'sm' : '',className)
  const indiactorClasses = classNames('progress__indicator',`progress__indicator__${variant}`)
  return (
    <Progress.Root className={classes} value={progress} {...rest}>
      <Progress.Indicator
        className={indiactorClasses}
        style={{ width:progress + '%'}}
      >
        {showPercentage && progress  + '%'} 
      </Progress.Indicator>
    </Progress.Root>
  );
};

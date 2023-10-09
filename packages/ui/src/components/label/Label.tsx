import { classNames } from '@codelab/lib';
import * as Label from '@radix-ui/react-label';
import React from 'react';

export interface ILabelProps extends React.HTMLAttributes<HTMLLabelElement>, Label.LabelProps {}

export const ClLabel = ({ htmlFor, children, className, ...rest }: ILabelProps) => {
  return (
    <Label.Root
      {...rest}
      className={classNames(className ?? '', 'transition', 'label')}
      htmlFor={htmlFor}
    >
      {children}
    </Label.Root>
  );
};

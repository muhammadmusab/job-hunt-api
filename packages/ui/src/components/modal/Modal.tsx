import { classNames } from '@codelab/lib';
import React from 'react';

export interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function ClModal({ children, ...rest }: IModalProps) {
  return (
    <div className={classNames('modal')} {...rest}>
      {children}
    </div>
  );
}

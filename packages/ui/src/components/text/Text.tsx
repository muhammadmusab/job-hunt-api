import { classNames } from '@codelab/lib';
import React from 'react';

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const ClText = ({ className, children, level = 4, style }: ITextProps) => {
  return (
    <p className={classNames(className ?? '', `text--level${level}`)} style={style}>
      {children}
    </p>
  );
};

export default ClText;

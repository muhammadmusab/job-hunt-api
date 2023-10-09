import { classNames } from '@codelab/lib';
import { ComponentAttrs } from '../../types/general';

interface IProps extends ComponentAttrs {
  lg?: number | 'auto';
  md?: number | 'auto';
  sm?: number | 'auto';
  xl?: number | 'auto';
  xs?: number | 'auto';
  xxl?: number | 'auto';
}

const getRowClass = (prefix: string, cols: number | 'auto') => {
  return `row-cols${prefix ? '-' + prefix : prefix}-${cols}`;
};

export const ClRow = ({ children,className = '', lg, md, sm, xl, xs, xxl }: IProps) => {
  const rowClass = [];
  if (lg) {
    rowClass.push(getRowClass('lg', lg));
  }
  if (md) {
    rowClass.push(getRowClass('md', md));
  }
  if (sm) {
    rowClass.push(getRowClass('sm', sm));
  }
  if (xl) {
    rowClass.push(getRowClass('xl', xl));
  }
  if (xs) {
    rowClass.push(getRowClass('', xs));
  }
  if (xxl) {
    rowClass.push(getRowClass('xxl', xxl));
  }
  const classes = classNames(className, 'row', rowClass.join(' '));
  return <div className={classes}>{children}</div>;
};



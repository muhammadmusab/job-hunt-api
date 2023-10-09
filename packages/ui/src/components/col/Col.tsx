import { classNames } from '@codelab/lib';
import { ComponentAttrs } from '../../types/general';

type ColType =
  | boolean
  | 'auto'
  | number
  | { span?: boolean | 'auto' | number; offset?: number; order?: 'first' | 'last' | number };
export interface IColProps extends ComponentAttrs {
  lg?: ColType;
  md?: ColType;
  sm?: ColType;
  xl?: ColType;
  xs?: ColType;
  xxl?: ColType;
}

const getColClasses = (prefix: string, cols: ColType) => {
  const _prefix = prefix ? '-' + prefix : prefix;
  if (typeof cols === 'boolean') return `col${_prefix}`;
  if (cols === 'auto' || typeof cols === 'number') return `col${_prefix}-${cols}`;
  const colClasses = [];
  if (cols.span) {
    if (typeof cols.span === 'boolean') colClasses.push(`col${_prefix}`);
    else colClasses.push(`col${_prefix}-${cols}`);
  }
  if (cols.order) {
    colClasses.push(`order${_prefix}-${cols}`);
  }
  if (cols.offset) {
    colClasses.push(`offset${_prefix}-${cols}`);
  }

  return colClasses;
};

export const ClCol = ({ lg, md, sm, xl, xs, xxl, className = '', children, ...rest }: IColProps) => {
  let colClasses = [];
  if (lg) {
    colClasses.push(getColClasses('lg', lg));
  }
  if (md) {
    colClasses.push(getColClasses('md', md));
  }
  if (sm) {
    colClasses.push(getColClasses('sm', sm));
  }
  if (xl) {
    colClasses.push(getColClasses('xl', xl));
  }
  if (xs) {
    colClasses.push(getColClasses('', xs));
  }
  if (xxl) {
    colClasses.push(getColClasses('xxl', xxl));
  }
  if (!md && sm && lg && xs && xl && xxl) {
    colClasses.push('col');
  }

  const classes = classNames(className, colClasses.join(' '));
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

import { classNames } from '@codelab/lib';

import { ComponentAttrs, Variant } from '../../types/general';

interface IProps extends ComponentAttrs {
  variant?: Variant;
}
export const Loader = ({ variant = 'primary', className = '', ...rest }: IProps) => {
  const classes = classNames('loader', variant ? `loader__${variant}` : '', className);
  return (
    <div className={classes} {...rest}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};



import {  Variant } from '../../types/general';
import { classNames } from '@codelab/lib';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  text?: string;
}

export const ClButton = ({
  variant = 'primary',
  children,
  text,
  className = '',
  disabled,
  ...rest
}: IButtonProps) => {
  return (
    <button className={classNames('btn', `btn__${variant}`, className)} disabled={disabled} {...rest}>
      {text ? text : children}
    </button>
  );
};

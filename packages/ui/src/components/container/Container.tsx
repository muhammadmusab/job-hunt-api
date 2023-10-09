import { classNames } from '@codelab/lib';

import { ComponentAttrs } from '../../types/general';

export interface IContainerProps extends ComponentAttrs {
  fluid?: true | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
}

export const ClContainer = ({
  children,
  fluid = 'sm',
  className = '',
  ...rest
}: IContainerProps) => {
  const containerClass = fluid ? `container-${fluid === true ? 'fluid' : fluid}` : 'container';
  const classes = classNames(className, containerClass);
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

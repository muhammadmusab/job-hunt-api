import { classNames } from '@codelab/lib';

import { IContainerProps, ClContainer } from './Container';

const ClOneSideContainer = ({ children, className = '', ...rest }: IContainerProps) => {
  const classes = classNames('one-side-container', className);

  return (
    <ClContainer className={classes} {...rest}>
      {children}
    </ClContainer>
  );
};

export default ClOneSideContainer;

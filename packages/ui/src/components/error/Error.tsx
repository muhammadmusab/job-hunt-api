import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const ClError = ({ children, ...rest }: IProps) => {
  return (
    <p className='invalid-feedback' {...rest}>
      {children}
    </p>
  );
};

export default ClError;

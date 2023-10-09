import { ClLink } from '@codelab/ui';
import ClHeading from '@codelab/ui/src/components/heading/Heading';
import React from 'react';

const Logo = () => {
  return (
    <ClLink href='/'>
      <ClHeading className='text-dark' level={2}>
        Job<span className='fw-bold text-primary'>Hunt</span>
      </ClHeading>
    </ClLink>
  );
};

export default Logo;

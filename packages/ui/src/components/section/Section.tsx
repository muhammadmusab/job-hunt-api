import React, { FC, CSSProperties } from 'react';

import { ComponentAttrs } from '../../types/general';
import { Heading } from '../heading/Heading.stories';

interface IProps extends ComponentAttrs {
  paddingTop?: string;
  paddingBottom?: string;
  marginBottom?: string;
  marginTop?: string;
  heading?: string;
}

export const Section = ({
  children,
  marginBottom = '3rem',
  marginTop = '0',
  paddingBottom = '2rem',
  paddingTop = '2rem',
  className = '',
  heading,
  style = {},
}: IProps) => {
  const styles = {
    marginTop,
    marginBottom,
    paddingBottom,
    paddingTop,
    ...style,
  };
  return (
    <section className={className} style={styles}>
      {heading && (
        <Heading className='text-secondary text-capitalize text-center mb-4' level={2}>
          {heading}
        </Heading>
      )}

      {children}
    </section>
  );
};

// Add headingProps prop and set its type by importing from heading component

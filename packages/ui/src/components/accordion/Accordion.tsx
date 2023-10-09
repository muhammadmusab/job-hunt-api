import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { RxChevronDown } from 'react-icons/rx';

import { classNames } from '@codelab/lib';

type AccordionProps =
  | ({ type: 'single' } & Accordion.AccordionSingleProps)
  | ({ type: 'multiple' } & Accordion.AccordionImplMultipleProps);

interface ITriggerProps extends Accordion.AccordionTriggerProps {
  headerProps?: Accordion.AccordionHeaderProps;
}

interface IAccordionItemProps extends Accordion.AccordionItemProps {
  triggerProps: ITriggerProps;
  contentProps: Accordion.AccordionContentProps;
}

export type IAccordionProps = AccordionProps & {
  items: IAccordionItemProps[];
};

export const ClAccordion = ({ items, ...rest }: IAccordionProps) => {
  const itemsJSX = items.map(({ triggerProps, contentProps, value, ...rest }) => (
    <Accordion.Item key={value} value={value} className='accordion__item' {...rest}>
      <AccordionTrigger {...triggerProps}>{triggerProps.children}</AccordionTrigger>
      <AccordionContent {...contentProps} value={value}>
        {contentProps.children}
      </AccordionContent>
    </Accordion.Item>
  ));
  return (
    <Accordion.Root className='accordion' {...rest}>
      {itemsJSX}
    </Accordion.Root>
  );
};

const AccordionTrigger = React.forwardRef<HTMLButtonElement, ITriggerProps>(
  ({ children, className = '', headerProps, ...rest }, forwardedRef) => {
    return (
      <Accordion.Header {...headerProps} className='accordion__header'>
        <Accordion.Trigger
          className={classNames('accordion__trigger', className)}
          {...rest}
          ref={forwardedRef}
        >
          {children}
          <RxChevronDown className='accordion__chevron' aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<HTMLDivElement, Accordion.AccordionItemProps>(
  ({ children, className = '', ...rest }, forwardedRef) => (
    <Accordion.Content
      className={classNames('accordion__content', className)}
      {...rest}
      ref={forwardedRef}
    >
      <div className='accordion__content__text'>{children}</div>
    </Accordion.Content>
  ),
);

AccordionContent.displayName = 'AccordionContent';

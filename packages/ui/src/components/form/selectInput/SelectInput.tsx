import React from 'react';
import * as Select from '@radix-ui/react-select';

import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { classNames } from '@codelab/lib';
import Error from '../../error/Error';

[{}];

interface ISelectOption {
  value: string;
  label: React.ReactNode;
}

export interface ISelectProps extends Select.SelectProps {
  placeholder?: React.ReactNode;
  options: { groupLabel?: React.ReactNode; options: ISelectOption[] }[];
  selectTriggerProps?: Select.SelectTriggerProps;
  selectTriggerIcon?: React.ReactNode;
  error?: string;
  hasError?: boolean;
}

export const ClSelectInput = ({
  placeholder,
  options,
  selectTriggerProps,
  selectTriggerIcon = <FaChevronDown />,
  error,
  hasError,
  children,
  ...rest
}: ISelectProps) => (
  <Select.Root {...rest}>
    <Select.Trigger
      className={classNames('select__trigger', hasError ? 'is-invalid' : '')}
      {...selectTriggerProps}
    >
      {placeholder && <Select.Value placeholder={placeholder} />}
      <Select.Icon className='Select__icon'>{selectTriggerIcon}</Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className='select__content'>
        <Select.ScrollUpButton className='select__scroll-button'>
          <FaChevronUp />
        </Select.ScrollUpButton>
        <Select.Viewport className='select__viewport'>
          {options.map((group, i) => {
            return (
              <React.Fragment key={i}>
                <Select.Group>
                  <Select.Label className='select__label'>{group.groupLabel}</Select.Label>
                  {group.options.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </Select.Group>

                {i < options.length - 1 && <Select.Separator className='select__separator' />}
              </React.Fragment>
            );
          })}
        </Select.Viewport>
        <Select.ScrollDownButton className='select__scroll-button'>
          <FaChevronDown />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
    {hasError && <Error>{error}</Error>}
    {children}
  </Select.Root>
);

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classNames('select__item', className ?? '')}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='select__item-indicator'>
          <FaCheck />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);
SelectItem.displayName = 'SelectItem';
export default ClSelectInput;

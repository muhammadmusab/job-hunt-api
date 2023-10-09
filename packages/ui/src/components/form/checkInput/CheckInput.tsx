import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa';
import { HiOutlineMinusSm } from 'react-icons/hi';
import { ClLabel } from '../../label/Label';
import { LabelProps } from '@radix-ui/react-label';
import Error from '../../error/Error';

interface IProps extends Checkbox.CheckboxProps {
  labelProps?: LabelProps;
  label?: LabelProps['children'];
  hasError?: boolean;
  error?: string;
}

export const ClCheckbox = ({
  error,
  hasError,
  checked,
  id,
  label,
  labelProps,
  children,
  name,
  value,
  ...rest
}: IProps) => (
  <div className='form-check'>
    <Checkbox.Root className='form-check__input' value={value} id={value as string} {...rest}>
      <Checkbox.Indicator className='form-check__indicator'>
        {checked === true && <FaCheck />}
        {checked === 'indeterminate' && <HiOutlineMinusSm />}
      </Checkbox.Indicator>
    </Checkbox.Root>
    <div className='d-flex flex-column'>
      {label && (
        <ClLabel {...labelProps} htmlFor={value as string}>
          {label}
        </ClLabel>
      )}
      {hasError && <Error>{error}</Error>}
    </div>
    {children}
  </div>
);

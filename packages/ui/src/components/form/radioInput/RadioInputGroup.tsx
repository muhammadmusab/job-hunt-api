import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import {  ClLabel } from '../../label/Label';
import {  Check } from '../checkInput/CheckInputFormik';
import { LabelProps } from '@radix-ui/react-label';
import { classNames } from '@codelab/lib';

export interface IRadioGroupProps extends RadioGroup.RadioGroupProps {
  radios: Check[];
  labelProps?: LabelProps;
  mainLabelProps?: LabelProps;
  label?: React.ReactNode;
  customLabel?:boolean,
  hideRadios?:boolean,
  inline?:boolean
}

export const ClRadioGroup = ({
  radios,
  children,
  labelProps,
  mainLabelProps,
  label,
  customLabel = false,
  hideRadios = false,
  inline = false,
  className = '',
  ...rest
}: IRadioGroupProps) => (
  <RadioGroup.Root className={classNames('form-radio-group mb-3',inline ? 'inline' : '',customLabel ? 'custom' : '',className)} {...rest}>
    {label && <ClLabel {...mainLabelProps}>{label}</ClLabel>}
    {radios.map((radio) => {
      return (
        <div className='form-radio-group__radio' key={radio.value}>
          <RadioGroup.Item className={classNames('form-radio-group__item',hideRadios ? 'd-none' : '')} value={radio.value} id={radio.value}>
            <RadioGroup.Indicator className='form-radio-group__indicator' />
          </RadioGroup.Item>
          {radio.label && customLabel ? (
            radio.label
          ) : (
            <ClLabel {...labelProps} htmlFor={radio.value}>
              {radio.label}
            </ClLabel>
          )}
        </div>
      );
    })}
    {children}
  </RadioGroup.Root>
);

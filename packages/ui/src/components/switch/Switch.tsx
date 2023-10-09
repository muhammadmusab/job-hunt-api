import { classNames } from '@codelab/lib';
import * as Switch from '@radix-ui/react-switch';
import React from 'react';
import { Variant } from '../../types/general';
import { ClLabel } from '../label/Label';

export interface ISwitchProps extends React.HTMLAttributes<HTMLFormElement> {
  variant?: Variant;
  name?: string;
  disabled?: Switch.SwitchProps['disabled'];
  defaultChecked?: Switch.SwitchProps['defaultChecked'];
  checked?: Switch.SwitchProps['checked'];
  required?: Switch.SwitchProps['required'];
  value?: Switch.SwitchProps['value'];
  label?: string;
  htmlFor?: string;
  onCheckedChange?: Switch.SwitchProps['onCheckedChange'];
}

export const ClSwitch = ({
  name,
  variant,
  disabled,
  defaultChecked,
  checked,
  required,
  value,
  label,
  htmlFor,
  onCheckedChange,
}: ISwitchProps) => {
  return (
    <form>
      <div className='flex__center transition'>
        <ClLabel className='label' htmlFor={htmlFor}>
          {label}
        </ClLabel>
        <Switch.Root
          name={name}
          disabled={disabled}
          defaultChecked={defaultChecked}
          checked={checked}
          required={required}
          value={value}
          onCheckedChange={onCheckedChange}
          className={classNames('switch', `switch__${variant}`)}
          id={htmlFor}
        >
          {/* <RxSun data-state={value} className='switch__icon' /> */}
          <Switch.Thumb className='switch__thumb' />
        </Switch.Root>
      </div>
    </form>
  );
};

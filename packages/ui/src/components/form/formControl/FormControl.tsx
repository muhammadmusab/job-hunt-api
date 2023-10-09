import { ClRadioInputFormik, IRadioGroupFormikProps } from '../radioInput/RadioInputGroupFormik';
import { ClTextInputFormik, IFormikTextInputProps } from '../textInput/TextInputFormik';

export enum Control {
  TextInput = 'TextInput',
  SelectInput = 'SelectInput',
  CheckInput = 'CheckInput',
  RadioInput = 'RadioInput',
}

type FormControlBase = {
  control: Control;
};

export type IFormControl = FormControlBase & (IFormikTextInputProps | IRadioGroupFormikProps);

export const FormControl = ({ control, ...rest }: FormControlBase & IFormControl) => {
  switch (control) {
    case Control.TextInput:
      return <ClTextInputFormik {...(rest as IFormikTextInputProps)} />;
    case Control.RadioInput:
      return <ClRadioInputFormik {...(rest as IRadioGroupFormikProps)} />;
    default:
      return <ClTextInputFormik {...(rest as IFormikTextInputProps)} />;
  }
};

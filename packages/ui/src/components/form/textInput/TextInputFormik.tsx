import { Field, FieldProps } from 'formik';
import { IInputProps } from '../Input';
import { ClTextInput } from './TextInput';

export type IFormikTextInputProps = IInputProps & {
  name: string;
};

export const ClTextInputFormik = ({ name, ...rest }: IFormikTextInputProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const hasError = Boolean(
          (meta.error && meta.touched) || (meta.error && form.submitCount >= 1),
        );

        return (
          <ClTextInput
            {...rest}
            {...field}
            error={form.errors[name] as string}
            hasError={hasError}
          />
        );
      }}
    </Field>
  );
};

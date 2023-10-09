import { Field, FieldProps } from 'formik';
import { ISelectProps, ClSelectInput } from './SelectInput';

interface IProps extends ISelectProps {
  name: string;
  className?: string;
}

export const ClSelectInputFormik = ({ name, className, children, ...rest }: IProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const hasError = Boolean(form.errors[name] && form.submitCount >= 1);

        return (
          <ClSelectInput
            {...rest}
            {...field}
            error={form.errors[name] as string}
            hasError={hasError}
            onValueChange={(value: string) => form.setFieldValue(name, value)}
          />
        );
      }}
    </Field>
  );
};

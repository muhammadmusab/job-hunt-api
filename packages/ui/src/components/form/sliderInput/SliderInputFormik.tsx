import { Field, FieldProps } from 'formik';
import { ISliderProps, ClSliderInput } from './SliderInput';

type IProps = ISliderProps & {
  name: string;
};

export const ClSliderInputFormik = ({ name, children, ...rest }: IProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const hasError = Boolean(form.errors[name] && form.submitCount >= 1);

        return (
          <ClSliderInput
            {...rest}
            {...field}
            onValueChange={(value: number[]) => form.setFieldValue(name, value)}
            error={form.errors[name] as string}
            hasError={hasError}
          />
        );
      }}
    </Field>
  );
};

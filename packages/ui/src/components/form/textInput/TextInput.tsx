import { ClInput, IInputProps } from '../Input';

export const ClTextInput = ({ children, Control, ...rest }: IInputProps) => {
  const rows = Control === 'textarea' ? 10 : undefined;
  return (
    <ClInput rows={rows} {...rest} Control={Control}>
      {children}
    </ClInput>
  );
};

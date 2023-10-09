import type { Story } from "@ladle/react";
import { ClButton } from "./Button";

export const Button: Story<{
  variant: string;
  disabled: boolean;
}> = ({ variant, disabled }) => <ClButton variant={variant} disabled={disabled}>This is a test</ClButton>

Button.storyName = "Default Button";

Button.args = {
  disabled: false,
};
Button.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" },
    defaultValue: "secondary",
  },
};
import type { Story } from "@ladle/react";
import { ClSwitch } from "./Switch";


export const Switch: Story<{
  variant: string;
  disabled: boolean;
}> = ({ variant, disabled }) => <ClSwitch></ClSwitch>

Switch.storyName = "Default Switch";

Switch.args = {
  disabled: false,
};
Switch.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" },
    defaultValue: "secondary",
  },
};
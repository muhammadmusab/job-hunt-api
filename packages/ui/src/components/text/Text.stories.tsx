import type { Story } from "@ladle/react";
import ClText, { ITextProps } from "./Text";

export const Text: Story<{
    level: ITextProps['level'];
  }> = ({ level}) => <ClText level={level}>This is a Text</ClText>

Text.storyName = "Default Text";

Text.argTypes = {
    level: {
        options: [1, 2, 3, 4, 5, 6],
        control: { type: "radio" },
        defaultValue: 2,
    },
};
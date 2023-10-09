import type { Story } from "@ladle/react";
import ClHeading, { IHeadingProps } from "./Heading";

export const Heading: Story<{
    level: IHeadingProps['level'];
  }> = ({ level}) => <ClHeading level={level}>This is a heading</ClHeading>

Heading.storyName = "Default Heading";

Heading.argTypes = {
    level: {
        options: [1, 2, 3, 4, 5, 6],
        control: { type: "radio" },
        defaultValue: 1,
    },
};
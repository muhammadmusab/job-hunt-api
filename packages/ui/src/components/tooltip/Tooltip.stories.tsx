import type { Story } from '@ladle/react';
import { ClButton } from '../button/Button';
import { ClTooltip, ITooltipProps } from './Tooltip';

export const Tooltip: Story<{
  showArrow?: ITooltipProps['showArrow'];
  arrowProps?: ITooltipProps['arrowProps'];
  triggerProps: ITooltipProps['triggerProps'];
  contentProps?: ITooltipProps['contentProps'];
  providerProps?: ITooltipProps['providerProps'];
}> = ({ showArrow, arrowProps, triggerProps, contentProps, providerProps }) => (
  <ClTooltip
    showArrow={showArrow}
    arrowProps={arrowProps}
    triggerProps={triggerProps}
    contentProps={contentProps}
    providerProps={providerProps}
  >
    This is a test
  </ClTooltip>
);

Tooltip.storyName = 'Default Tooltip';

Tooltip.args = {
  showArrow: true,
};


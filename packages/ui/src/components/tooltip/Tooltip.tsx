import * as Tooltip from '@radix-ui/react-tooltip';

export interface ITooltipProps extends Tooltip.TooltipProps {
  showArrow?: boolean;
  arrowProps?: Tooltip.TooltipArrowProps;
  triggerProps: Tooltip.TooltipTriggerProps;
  contentProps?: Tooltip.TooltipContentProps;
  providerProps?: Tooltip.TooltipProviderProps;
}

export const ClTooltip = ({
  showArrow = true,
  arrowProps,
  triggerProps,
  contentProps,
  providerProps,
  children,
  ...rest
}: ITooltipProps) => {
  return (
    <Tooltip.Provider {...providerProps}>
      <Tooltip.Root {...rest}>
        <Tooltip.Trigger  {...triggerProps}>{triggerProps.children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className='tooltip__content' {...contentProps}>
            {children}
            {showArrow && <Tooltip.Arrow className='tooltip__arrow' {...arrowProps} />}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

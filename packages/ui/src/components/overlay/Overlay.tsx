import { classNames } from '@codelab/lib';
import React from 'react';

interface IOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  children: React.ReactNode;
  backdropBlur?: boolean;
  position?: 'top' | 'bottom' | 'center';
  animation?: 'zoom' | 'slide';
}

export default function ClOverlay({
  visible,
  children,
  backdropBlur,
  position,
  animation,
  ...rest
}: IOverlayProps) {
  //   function preventBubbling(event: any) {
  //     event.stopPropagation();
  //   }
  return (
    <>
      {visible && (
        <div
          className={classNames(
            'overlay',
            `overlay__${position ? position : 'center'} ${backdropBlur && 'backdropBlur'}`,
          )}
          {...rest}
        >
          <div className={classNames(`${animation}`)} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

import { classNames } from '@codelab/lib';
import * as Avatar from '@radix-ui/react-avatar';
import React from 'react';

export enum IAvatarVariantEnums {
  ONLINE = 'success',
  NOT_AVAILABLE = 'danger',
}

export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: Avatar.AvatarImageProps['src'];
  alt?: Avatar.AvatarImageProps['alt'];
  delayMs?: Avatar.AvatarFallbackProps['delayMs'];
  children: Avatar.AvatarFallbackProps['children'];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  variant?: IStatusProps['variant'];
}

export const ClAvatar = ({ src, alt, delayMs, children, size, variant }: IAvatarProps) => (
  <div>
    <Avatar.Root className={classNames('avatar', `avatar__${size}`)}>
      <Avatar.Image className='avatar__image' src={src} alt={alt} />
      <Avatar.Fallback className='avatar__fallback' delayMs={delayMs ? delayMs : 600}>
        {children}
      </Avatar.Fallback>
      <ClStatus variant={variant}>
        <ClStatusDot />
      </ClStatus>
    </Avatar.Root>
  </div>
);

export interface IStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'danger' | 'warning' | 'success';
}

const ClStatus = ({ children, variant }: IStatusProps) => (
  <div className={classNames('status', `status__${variant}`)}>{children}</div>
);

const ClStatusDot = () => <div className='status__dot' />;

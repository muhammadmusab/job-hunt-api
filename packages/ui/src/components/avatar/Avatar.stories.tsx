import type { Story } from '@ladle/react';
import * as Avatar from '@radix-ui/react-avatar';
import { ClAvatar, IStatusProps } from './Avatar';

export const DefaultAvatar: Story<{
  src?: Avatar.AvatarImageProps['src'];
  alt?: Avatar.AvatarImageProps['alt'];
  delayMs?: Avatar.AvatarFallbackProps['delayMs'];
  children: Avatar.AvatarFallbackProps['children'];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  variant?: IStatusProps['variant'];
}> = ({ src, alt, delayMs, children, size, variant }) => (
  <ClAvatar
    src={src}
    alt={alt}
    delayMs={delayMs}
    children={children}
    size={size}
    variant={variant}
  ></ClAvatar>
);

DefaultAvatar.storyName = 'Default Avatar';

DefaultAvatar.args = {
    src: 'https://avatars.githubusercontent.com/u/15818956?v=4',
    alt: 'avatar',
    delayMs: 600,
    children: 'J',
};
DefaultAvatar.argTypes = {
  variant: {
    options: ['danger', 'warning', 'success'],
    control: { type: 'radio' },
    defaultValue: 'success',
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'radio' },
    defaultValue: 'md',
  }
};

import type { Story } from '@ladle/react';
import ClOverlay from './Overlay';

export const Overlay: Story<{}> = () => <ClOverlay visible={true}>This is a test</ClOverlay>;

Overlay.storyName = 'Default Overlay';

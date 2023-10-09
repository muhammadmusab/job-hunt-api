import type { Story } from '@ladle/react';
import { ClToast } from './Toast';
import * as Toast from '@radix-ui/react-toast';

export const DefaultToast: Story<{
  providerProps?: Toast.ToastProviderProps;
  closeProps?: Toast.ToastCloseProps;
  titleProps?: Toast.ToastTitleProps;
  descriptionProps?: Toast.ToastDescriptionProps;
  actionProps?: Toast.ToastActionProps;
  viewportProps?: Toast.ToastViewportProps;
}> = ({ providerProps, closeProps, titleProps, descriptionProps, actionProps, viewportProps }) => (
  <ClToast
    providerProps={providerProps}
    closeProps={closeProps}
    titleProps={titleProps}
    descriptionProps={descriptionProps}
    actionProps={actionProps}
    viewportProps={viewportProps}
  >
    This is a Text
  </ClToast>
);

DefaultToast.storyName = 'Default Toast';



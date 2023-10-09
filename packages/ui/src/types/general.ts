export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | string;

import React, { CSSProperties } from 'react';

export interface ComponentAttrs {
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  id?: string;
  
}

import { classNames } from '@codelab/lib';
import React from 'react';
import { ComponentAttrs } from '../../types/general';

interface IProps extends ComponentAttrs, React.LiHTMLAttributes<HTMLUListElement> {
  navLinks: React.ReactNode[];
}
export const ClNav = ({ className = '', navLinks }: IProps) => {
  const navLinksJSX = navLinks.map((link) => <li className='nav__item'>{link}</li>);
  return <ul className={classNames(className, 'nav','d-flex align-items-center')}>{navLinksJSX}</ul>;
};

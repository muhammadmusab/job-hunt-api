import { classNames } from '@codelab/lib';
import { ComponentAttrs } from '@codelab/ui';

import classes from './authLayout.module.scss';
interface IProps extends ComponentAttrs {}
export const AuthLayout = ({ children }: IProps) => {
  return (
    <main className={classNames('d-flex auth-layout', classes['auth-layout'])}>
      {/* <div
        className='d-flex justify-content-center align-items-center'
        style={{ width: '50%', height: '100%' }}
      > */}
      {children}
      {/* </div>
      <div
        className='bg-gray-1 d-flex flex-column align-items-center justify-content-center'
        style={{ width: '50%', height: '100%' }}
      >

  
      </div> */}
       
    </main>
  );
};

import { ComponentAttrs } from '@codelab/ui'

import React from 'react'
import Header from '../header/Header'


interface IProps extends ComponentAttrs{}
export const MainLayout = ({ children }: IProps) => {
  return (
    <>
    <Header/>
    <main>
        {children}
    </main>
    </>

  )
}


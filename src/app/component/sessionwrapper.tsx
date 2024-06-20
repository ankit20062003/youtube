'use client'
import React, { Children, ReactNode } from 'react'
import {SessionProvider} from 'next-auth/react'

interface Props{
    children : ReactNode;
}

function SesssionWrapper({ children } : Props) {
  return (
        <SessionProvider>
            {children}
        </SessionProvider>      

  )
}

export default SesssionWrapper

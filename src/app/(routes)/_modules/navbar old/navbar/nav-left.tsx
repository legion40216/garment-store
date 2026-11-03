import React from 'react'
import Brandname from './nav-left/brandname'
import NavMobile from './nav-left/nav-mobile'

export default function NavLeft() {
  return (
    <div className='flex gap-3 items-center'>
      <div className='hidden md:block'>
        <Brandname/>
      </div>
        <NavMobile/>
    </div>
  )
}

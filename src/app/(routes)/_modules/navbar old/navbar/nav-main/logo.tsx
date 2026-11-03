import React from 'react'
import Image from 'next/image'
export default function Logo() {
  return (
    <div>
      <Image 
      src="/images/logo.svg" // Do not include 'public'
      alt="logo" 
      width={50} 
      height={50}
      />
    </div>
  )
}

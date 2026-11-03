"use client"
import Link from 'next/link'
import React from 'react'
import {  useNavRoutes } from './navbar'

import NavLinks from './navbar/components/nav-links'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const routes = useNavRoutes()

  return (
<div className="grid gap-10 place-content-center place-items-center 
md:grid-cols-[auto_1fr_auto] md:gap-4 bg-secondary p-4"
>
    <div className='flex flex-col justify-between items-center md:items-start h-full'>
        <Link 
        href={'#'} 
        className='text-lg font-bold'
        >
        Brandname
        </Link>
        <ul className='flex'>
            <li>
                Icon
            </li>
            <li>
                Icon
            </li>
            <li>
                Icon
            </li>
            <li>
                Icon
            </li>
        </ul>
    </div>
 

    <div>
        <nav>
            <ul className='grid grid-cols-2 gap-2 place-items-center'>
                {routes.map((item, index) => (
                <li key={index} >
                    <NavLinks 
                    route={item}
                    className={"text-sm"}
                    />
                 </li>
                ))}
            </ul>
        </nav>
    </div>

    <div className='flex flex-col justify-between items-center md:items-start h-full'>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <label htmlFor="newsletter">
            <input 
            type="email" 
            name="" 
            id="newsletter" 
            placeholder='Sign up for Newsletter'
            />
            </label>
            <Button type="submit">
                Go
            </Button>
        </form>

        <p className="text-xs ">Copyright 2020. All Right Reserved</p>
    </div>           
</div>
  )
}

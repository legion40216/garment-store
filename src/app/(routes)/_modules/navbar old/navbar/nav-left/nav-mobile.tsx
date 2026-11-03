import React from 'react'

import NavLinks from '../components/nav-links'
import { AlignJustify, Sun, X } from 'lucide-react'
import Image from 'next/image'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { useNavRoutes } from '../../navbar'

export default function NavMobile() {
  const routes = useNavRoutes()

  return (
      <Sheet>
        <SheetTrigger asChild>
        <Button 
        variant={"outline"}
        size={"icon"}
        >
          <AlignJustify className='size-5'/>
        </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-3 [&>button]:hidden">
          <SheetTitle className="hidden">
            Menu
          </SheetTitle>
          
          <SheetDescription className="hidden">
            Navigation for mobile screens
          </SheetDescription>

          <div className="flex flex-col justify-between h-full">
            <div className='grid gap-3'>
              <div className='flex items-center justify-between'>
                <Image 
                  src="/images/logo.svg"
                  alt="logo" 
                  width={40} 
                  height={40}
                />
                <div className='flex gap-1'>
                  <Button 
                  variant="outline" 
                  size={"icon"}
                  >
                    <Sun className="size-5" />
                  </Button>
                  <SheetTrigger asChild>
                    <Button 
                    variant="outline" 
                    size={"icon"}
                    >
                      <X className="size-5" />
                    </Button>
                  </SheetTrigger>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                {routes.map((item, index) => (
                  <NavLinks 
                    key={index} 
                    route={item}
                    className={"border-b-[2px] border-b-secondary-200"}
                  />
                ))}
              </div>
            </div>

            <div>
                <span>phone</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
  )
}

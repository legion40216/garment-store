import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function ViewCollection() {
  return (
    <div className='text-center space-y-5 py-[3rem] bg-gray-300'>
        <p className=" font-bold text-3xl">
            #Brandname ON INSTAGRAM
        </p>
        <Button asChild variant={"default"} size={"lg"}>
            <Link href="/collection">
                View Collection
            </Link>
        </Button>
    </div>
  )
}

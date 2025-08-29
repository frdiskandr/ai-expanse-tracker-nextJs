import Image from 'next/image'
import React from 'react'

export default function Logo() {
    return (
        <div className='p-2 h-full bg-gradient-to-br from-blue-800 via-yellow-100 to-blue-900 box-border rounded-2xl'>
            <Image alt='logo' src={"/money.png"} width={100} height={100} className='max-h-full max-w-8'/>
        </div>
    )
}

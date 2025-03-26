import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    className: string,
    img: string,
    title: string,
    description: string,
    handleClick: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <div>
      <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[185px] rounded-[14px] cursor-pointer', className)}
        onClick={handleClick}      
      >
        <div className='glassmorphism size-12 rounded-[10px] flex items-center justify-center'>
            <Image src={img} width={27} height={27} alt='meeting' className='' />
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title} </h1>
            <p className='text-lg font-normal'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeCard

'use client'
import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
  

interface MeetingModalProps {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    className?: string,
    children?: ReactNode,
    handleClick?: () => void,
    buttonText: string,
    image?: string,
    buttonIcon?: string
}

const MeetingModal = ({ isOpen, onClose, title, children, className, handleClick, buttonText, image, buttonIcon }: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}> 
    <DialogContent className='flex w-[330px] lg:w-full flex-col gap-6 border-none bg-[#1C1F2E] px-6 py-9 text-white'>
      <div className='flex flex-col gap-6'>
            {image && (
                <div className='flex justify-center'>
                    <Image src={image} alt='image' width={72} height={72}/>
                </div>
            )}
            <h1 className={cn('text-2xl lg:text-3xl font-bold leading-[42px]', className)}>{title}</h1>
            {children}
            <Button className='bg-[#0E78F9] focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer' onClick={handleClick}>
                {buttonIcon && (
                    <Image src={buttonIcon} alt='button icon' width={13} height={13} />
                )} &nbsp;
                {buttonText || 'Schedule Meeting'}
            </Button>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}

export default MeetingModal

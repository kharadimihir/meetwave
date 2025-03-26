import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "MeetWave",
  description: "Video calling app",
  icons: "/icons/logo.svg"
}

const Rootlayout = ({ children }: { children: ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
      {children}  
      <Toaster />
      </StreamVideoProvider>
    </main>
  )
}

export default Rootlayout

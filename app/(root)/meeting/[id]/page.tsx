"use client"

import Loader from '@/components/loader'
import MeetingRoom from '@/components/meetingroom'
import MeetingSetup from '@/components/meetingsetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamCallProvider, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

type MeetingProps = {
  params: { id: string }; 
};

const Meeting = ({ params }: MeetingProps) => {

  const { id } = params;
  const { user, isLoaded } = useUser();
  const [ isSetupComplete, SetIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(id);

  if(isCallLoading) return <Loader />
  if(!call) return <p className='text-white text-center mt-10'>Call not found</p>
  return (
    <main className='h-screen w-full'>  
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MeetingSetup SetIsSetupComplete={SetIsSetupComplete} />
            ): (
              <MeetingRoom />
            )}
          </StreamTheme>
        </StreamCall>
    </main>
  )
}

export default Meeting

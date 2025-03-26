"use client"

import Loader from '@/components/loader'
import MeetingRoom from '@/components/meetingroom'
import MeetingSetup from '@/components/meetingsetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamCallProvider, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'


const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {

  const [meetingId, setMeetingId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const [ isSetupComplete, SetIsSetupComplete] = useState(false);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Await the Promise
      setMeetingId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  const { call, isCallLoading } = useGetCallById(meetingId ?? "");

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

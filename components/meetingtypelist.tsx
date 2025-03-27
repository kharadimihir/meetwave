'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './meetingmodal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'



const MeetingTypeList = () => {

    const[meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const router = useRouter();
    const { user } = useUser();
    const client = useStreamVideoClient();

      
    const [values, setValues] = useState({
      dateTime: new Date(),
      description: '',
      link: ''
    });
    const [ callDetails, setCallDetails ] = useState<Call>();

    const createMeeting  = async () => {
        if( !user || !client) return ;

        if (!values.dateTime) {
          toast("please select a date and time")
          return ;
        }

        try {
          const id = crypto.randomUUID();
          const call = client.call("default", id);
          if(!call) throw new Error("Failed to create call");

          const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
          const description = values.description || 'Instant Meeting';

          await call.getOrCreate({
            data: {
              starts_at: startsAt,
              custom: {
                description: description
              }
            },
          })
          setCallDetails(call);

          if (!values.description) {
            router.push(`/meeting/${call.id}`)
          }

          toast("Meeting created successfully")
        } catch (error) {
          console.error("Error creating meeting:", error);
          toast("Error while connecting")
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-[#FF742E]'
      />
      <HomeCard
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation link'
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className='bg-[#0E78F9]'
      />
       <HomeCard
        img='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className='bg-[#830EF9]'
      />
      <HomeCard
        img='/icons/recordings.svg'
        title='View Recordings'
        description='Meeting recordings'
        handleClick={() => router.push('/recordings')}
        className='bg-[#F9A90E]'
      />

      {!callDetails ? (
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title='Create Meeting'
        buttonText='Schedule Meeting'
        handleClick={createMeeting}
      >
        <div className='flex flex-col gap-2.5 '>
          <label className='leading-[22px] text-base font-normal text-[#ECF0FF]'>
            Add a description
          </label>
          <Textarea className='border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0' 
            onChange={(e) => {
              setValues({...values, description:e.target.value})
            }}
          />
        </div>
        <div className='flex flex-col w-full gap-2.5'>
        <label className='leading-[22px] text-base font-normal text-[#ECF0FF]'>
           Select Date and Time
          </label>
          <ReactDatePicker 
            selected={values.dateTime}
            onChange={(date) => setValues({...values, dateTime: date!})}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='MMMM d yyyy h:mm aa'
            className='w-full rounded bg-[#252A41] p-2 focus:outline-none'
          />
        </div>
      </MeetingModal>
      ): (
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={()=>setMeetingState(undefined)}
        className='text-center'
        title='Meeting Created'
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink.split("/meeting/")[1]);
          toast("Link copied")
        }}
        image='/icons/checked.svg'
        buttonIcon='/icons/copy.svg'
        buttonText='Copy Meeting Link'
      />
      )}

      <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title='Start an Instant Meeting'
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
      />

      <MeetingModal 
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title='Type the link here'
        className='text-center'
        buttonText='Join Meeting'
        handleClick={() => router.push(values.link)}
      >
        <Input 
          placeholder='Meeting link'
          className='border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e) => setValues({...values, link:e.target.value })}
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList

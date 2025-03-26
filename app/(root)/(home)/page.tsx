import MeetingTypeList from '@/components/meetingtypelist';
import Image from 'next/image'
import React from 'react'

const Home = () => {

  const now = new Date();

  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit'}).split(' ')[0];
  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full'})).format(now);


  return (
    <section className='relative flex size-full flex-col gap-10 text-white'>
      {/* Image Wrapper */}
      <div className="relative w-full h-[23rem]">
        <Image 
          src="/images/hero-background.png"
          width={800}
          height={300}
          alt='bg-img'
          className='rounded-3xl w-full h-[23rem] object-cover'
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-between p-4 bg-black/40 rounded-3xl">
          <h2 className="text-white rounded p-2 ml-6 mt-8 lg:text-lg glassmorphism max-w-[270px] text-center text-base  font-light">Upcoming Meeting at: 12:30 PM</h2>
          <div className='flex flex-col ml-6 gap-2'>
            <h1 className='text-4xl font-bold lg:text-6xl'>
              {time} <span className='text-sm -ml-1  lg:text-2xl font-medium'>{now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[1].toUpperCase()}</span>
            </h1>
            <p className='text-lg font-medium text-[#C9DDFF] lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home

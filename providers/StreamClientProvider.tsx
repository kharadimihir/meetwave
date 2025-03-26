'use client'

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideoClient ,StreamVideo } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";


const StreamVideoProvider = ({ children }: { children: ReactNode }) => {

    const[videoClient, setVideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();

    const apikey = "9cmaejqdbw9u" || process.env.NEXT_PUBLIC_STREAM_API_KEY;

    useEffect(()=>{
        if(!apikey) throw new Error('Stream api key is missing');
        if(!user || !isLoaded) return ;

        const client = new StreamVideoClient( apikey );

client.connectUser(
  {
    id: user?.id,
    name: user?.username || user?.id,
    image: user?.imageUrl
  },
  async () => await tokenProvider()
).then(() => setVideoClient(client));

    }, [user, isLoaded, apikey]);

    if(!videoClient) return <Loader />

  return <StreamVideo client={videoClient}>
    {children}
  </StreamVideo>;
};

export default StreamVideoProvider;
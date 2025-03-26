'use server'

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {

    const user = await currentUser();

    if(!apiKey) throw new Error("Stream apikey is missing");
    if(!apiSecret) throw new Error("No api secret");
    if(!user) throw new Error("user not logged in");


    const client = new StreamClient(apiKey, apiSecret, { 
        timeout: 6000
      });
      

    // const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    // const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.generateUserToken({ user_id: user.id });




    return token;
}
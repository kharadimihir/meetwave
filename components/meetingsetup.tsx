"use client";
import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({ SetIsSetupComplete }: { SetIsSetupComplete: (value: boolean) => void }) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  if (!call) {
    <div className="flex items-center justify-center h-screen text-white">
      <p className="text-lg">Connecting to the call...</p>
    </div>;
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex items-center justify-center h-16 gap-3">
      <label className="flex items-center justify-center gap-2 font-medium cursor-pointer">
        <input 
            type="checkbox"
            checked= {isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)} 
        />
        Join with mic and camera off
      </label>
      <DeviceSettings />
    </div>
    <Button className="rounded-md bg-green-500 px-4 py-2.5 cursor-pointer" onClick={() => {
        call?.join();
        SetIsSetupComplete(true);
    }}>
        Join Meting
    </Button>
    </div>
  );
};

export default MeetingSetup;

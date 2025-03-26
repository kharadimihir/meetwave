import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./mobilenav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between h-16 items-center fixed z-50 w-full bg-[#1C1F2E] px-6 py-2 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="icons/logo.svg"
          width={32}
          height={32}
          alt="MeetWave logo"
          className="max-sm:size-10"
        />
        <p className="text-[22px] font-bold text-white pl-2 max-sm:hidden">
          MeetWave
        </p>
        
      </Link>
      <div className="max-sm:hidden">
      <SignedIn>
          <UserButton 
            appearance={{
              variables: {
                colorText: "#111",
          colorPrimary: "#0E78F9",
          colorBackground: "#fff",
          colorInputBackground: "#252a41",
          colorInputText: "#fff"
              }
            }} 
            />
        </SignedIn>
      </div>

      <div className="flex justify-between items-center gap-5 lg:hidden">
        <SignedIn>
          <UserButton
          appearance={{
            variables: {
              colorText: "#111",
        colorPrimary: "#0E78F9",
        colorBackground: "#fff",
        colorInputBackground: "#252a41",
        colorInputText: "#fff"
            }
          }} 
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;

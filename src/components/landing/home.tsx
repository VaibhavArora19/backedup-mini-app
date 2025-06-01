'use client';

import { useState } from "react";
import { Button } from "../ui/Button";
import Confetti from 'react-confetti'
import { BACKEND_URL } from "~/constant";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);

    const signupHandler = async () => {
      try {

        await sdk.actions.addMiniApp();
        
        const context = (await sdk.context).user;
        
        const response = await fetch(`${BACKEND_URL}/fid`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fid: context.fid,
          })
        });
        
        if(!response.ok) {
          throw new Error("Response not ok");
        }
        
        await response.json();
        
        setShowConfetti(true);
        setIsSignedUp(true);
        
        setTimeout(() => {
          setIsSignedUp(false);
          setShowConfetti(false);
        }, 5000);
      } catch(e) {
        console.error(`${e}`)
      }
    }

    const createCampaignHandler = async () => {
      await sdk.actions.openUrl("https://coincast-fe.vercel.app/campaigns/create")
    }

    return (
    <div
      style={{
        background: 'linear-gradient(116.72deg, #F3F0FF 40%, #F0F6FF 60%)',
        minHeight: '100vh', // full height
        padding: '2rem',     // optional padding
      }}
      className="font-[family-name:var(--font-practa)]"
    >
    <div className="flex flex-col justify-center">
    {/* <Image src={"/homepage1.png"} alt="homepage1" width={0} height={0} sizes="100vh" className="absolute top-0 left-0 m-0 p-0"/> */}
    <h1 className="text-4xl font-bold text-gray-800 text-center mt-32">
        Backed Up
    </h1>
     <Button className="w-[20%] mx-auto mt-10" onClick={signupHandler}>{isSignedUp ? "Signed up" : "Sign up"}</Button> 
    {/* <Image src={"/homepage2.png"} alt="homepage2" width={0} height={0} sizes="100vh" className="absolute top-0 right-0 m-0 p-0"/> */}
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-gray-800 text-center mt-32">The possibilities are endless</h1>
      <Button className="mx-auto mt-10" onClick={createCampaignHandler}>Create Campaign</Button>
    </div>
    {showConfetti && <Confetti />}
    </div>
    </div>
    )
}
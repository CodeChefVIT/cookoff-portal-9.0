"use client";

import chefhat from "@/assets/images/chefshat.svg";
import { ProfileHeaderSVG } from "@/assets/svgPaths";
import { type profileData } from "@/schemas/api";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";

interface TimerResponse {
  message: string;
  remainingTime: number;
}

export default function ProfileComponent({
  profile,
}: {
  profile: profileData | undefined;
}) {
  const router = useRouter(); // Initialize router
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    const checkTimerStatus = async () => {
      try {
        const res = await axios.get<TimerResponse>("/api/countdown");
        const data = res.data;
        if (data.remainingTime > 0) {
          setIsTimerActive(true);
        } else {
          setIsTimerActive(false);
        }
      } catch (err) {
        setIsTimerActive(false);
      }
    };

    void checkTimerStatus();
  }, []);

  return (
    <div className="roboto relative my-auto max-h-full w-min bg-[#202020] p-4">
      {/* Background shape with white border */}
      {/* <ProfileBackgroundSVG className="absolute top-0 left-0 max-h-fit" /> */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Profile header with white border */}
        <div className="relative w-full">
          <ProfileHeaderSVG />
          <h1 className="s-sling absolute left-1/2 top-2 -translate-x-1/2 px-8 text-4xl font-normal text-[#F14A16]">
            PROFILE
          </h1>
        </div>

        {/* Profile picture placeholder */}
        <Image
          className="mt-10"
          src={chefhat as HTMLImageElement}
          alt="chef hat"
          width={1000}
          height={400}
        />
        {/* Input fields */}
        <div className="mt-9 w-full space-y-9 px-4 font-mono font-bold">
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {"Name: " + profile?.username ?? ""}
          </div>
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {"Round: " + profile?.round ?? "Nothing yet."}
          </div>
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {"Score: " + profile?.score.toFixed(2) ?? "Nothing yet."}
          </div>

          {isTimerActive && (
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/oven")} // Navigate to root route
                className="s-sling mt-4 w-full rounded-lg bg-[#F14A16] px-6 py-3 text-white transition-colors hover:bg-[#d13e14]"
              >
                Start Cooking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

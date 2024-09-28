"use client";

import Judgelogo from "@/assets/judge.svg";
import sululogo from "@/assets/sulu.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Timer from "./ui/timer";
export default function QuesNavbar() {
  const path = usePathname();
  const router = useRouter();

  const handleendtest = () => {
    localStorage.clear();
    router.push("/test-complete");
  };

  return (
    <div className="flex h-[17vh] w-screen flex-row items-center justify-between border-b-2 border-cream bg-black px-10 2xl:h-[14vh]">
      <div>{path !== "/kitchen" && <Timer />}</div>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-col">
          <div>
            <span className="s-sling mr-8 text-7xl text-cream">COOK</span>
            <span className="s-sling mr-8 text-7xl text-accent">OFF</span>
            <span className="s-sling text-7xl text-cream">9.0</span>
          </div>

          <div className="flex items-center self-end">
            <span className="strait-regular mr-1 text-lg text-[#FFFFFF]">
              Powered by
            </span>
            <Image
              src={Judgelogo as HTMLImageElement}
              alt="Judge"
              width={60}
              height={60}
              style={{ marginTop: "3px" }}
            />
            <span className="strait-regular mx-1 text-lg text-[#FFFFFF]">
              and
            </span>
            <Image
              src={sululogo as HTMLImageElement}
              alt="Sulu"
              width={60}
              height={60}
              style={{ marginTop: "-2px" }}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleendtest}
          className="s-sling whitespace-nowrap rounded-md bg-dark2 p-2 px-10 text-lg text-cream hover:bg-accent hover:text-black"
        >
          End Test
        </button>
      </div>

      <div></div>
    </div>
  );
}

"use client";
import check from "@/assets/images/check.png";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TestComplete() {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <div className="h-screen bg-dark">
        <div className="flex h-[85vh] flex-col items-center justify-center bg-dark">
          <div className="">
            <div className="rounded-full border-[3px] border-accent">
              <div className="rounded-full border-[6px] border-dark bg-lightGray">
                <Image
                  src={check}
                  alt="check"
                  width={100}
                  height={100}
                  className="!w-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-[30px] text-xl text-cream">
            You have completed the test. Stay tuned for the Results!
          </div>
          <div className="mt-[50px]">
            <button
              className="rounded-md border-2 border-accent px-6 py-2 text-cream hover:bg-orange-600 hover:border-black hover:text-white"
              onClick={() => router.push("/kitchen")}
            >
              Back To Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

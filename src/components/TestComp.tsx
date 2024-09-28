import React from "react";
import Image from "next/image";
import gCheck from "@/assets/images/gCheck.png";
import rCross from "@/assets/images/rCross.png";

type TestCompProps = {
  isPassed: boolean;
  num: number;
  isClicked: boolean;
};

export default function TestComp({ isPassed, num, isClicked }: TestCompProps) {
  return (
    <div
      className={`mx-3 my-2 flex h-14 cursor-pointer items-center justify-evenly rounded-lg border-2 bg-black px-4 py-3 text-center ${isClicked && isPassed ? "border-green2" : isClicked && !isPassed ? "border-accent" : "border-dark"}`}
    >
      <Image
        className=""
        src={isPassed ? gCheck : rCross}
        alt="green check"
        width={18}
        height={18}
      />
      <p className="mx-1 text-base">Test Case {num + 1}</p>
    </div>
  );
}

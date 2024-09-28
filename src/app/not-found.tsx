"use client";
import cat from "@/assets/images/cat.svg";
import dog from "@/assets/images/dog.svg";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  // Function to handle click events
  const handleDogClick = () => {
    alert("You've been validated as a human being. Dogs really are the best!");
  };

  const handleCatClick = () => {
    alert("Really? Cats? 🤨");
  };

  return (
    <div className="min-h-screen overflow-y-hidden bg-gradient-to-b from-black via-orange-500/90 to-black">
      <div className="s-sling mt-36 bg-gradient-to-r from-red-500 via-orange-500 to-white bg-clip-text text-center text-5xl text-orange-500 text-transparent">
        Page Not Found
      </div>
      <p className="s-sling text-center text-white">
        Could not find the requested resource
      </p>
      <p className="mt-5 bg-gradient-to-r from-red-500 via-orange-500 to-white bg-clip-text text-center font-mono text-2xl font-bold text-orange-700 text-transparent">
        While we wait for this to happen, are you a dog person or a cat person?
      </p>
      <div className="mx-auto flex items-center justify-center gap-10">
        <Image
          className="mt-10 cursor-pointer rounded-lg"
          src={dog as HTMLImageElement}
          alt="dog"
          width={500}
          height={400}
          onClick={handleDogClick} // Click handler for dog
        />
        <Image
          className="mt-10 cursor-pointer rounded-lg"
          src={cat as HTMLImageElement}
          alt="cat"
          width={500}
          height={400}
          onClick={handleCatClick} // Click handler for cat
        />
      </div>
      <div className="s-sling mt-10 text-center text-xl">
        <Link href="/kitchen" className="text-white">
          Return to DashBoard
        </Link>
      </div>
    </div>
  );
}

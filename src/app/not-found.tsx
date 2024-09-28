"use client";
import cat from "@/assets/images/cat.svg";
import dog from "@/assets/images/dog.svg";
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  // Function to handle click events
  const handleDogClick = () => {
    alert("You've been validated as a human being. Dogs really are the best!");
  };

  const handleCatClick = () => {
    alert("Really? Cats? 🤨");
  };

  return (
    <div className="bg-gradient-to-b from-black via-orange-500/90 to-black min-h-screen overflow-y-hidden">
      <div className='mt-36 text-center text-5xl s-sling text-orange-500 bg-gradient-to-r from-red-500 via-orange-500 to-white bg-clip-text text-transparent'>
        Something Went Wrong
      </div>
      <p className='text-white text-center s-sling'>Could not find the requested resource</p>
      <p className='text-center mt-5 font-bold text-2xl font-mono text-orange-700 bg-gradient-to-r from-red-500 via-orange-500 to-white bg-clip-text text-transparent'>
        While we wait for this to happen, are you a dog person or a cat person?
      </p>
      <div className="flex gap-10 mx-auto items-center justify-center">
        <Image
          className="mt-10 rounded-lg cursor-pointer"
          src={dog as HTMLImageElement}
          alt="dog"
          width={500}
          height={400}
          onClick={handleDogClick} // Click handler for dog
        />
        <Image
          className="mt-10 rounded-lg cursor-pointer"
          src={cat as HTMLImageElement}
          alt="cat"
          width={500}
          height={400}
          onClick={handleCatClick} // Click handler for cat
        />
      </div>
      <div className="text-center text-xl mt-10 s-sling">
        <Link href="/dashboard" className='text-white'>Return to DashBoard</Link>
      </div>
    </div>
  )
}

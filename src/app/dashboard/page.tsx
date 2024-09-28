"use client";
import NavBar from "@/components/NavBar";
import ProfileComponent from "@/components/profileComponent";
import DashboardComponent from "@/components/ui/dashboard";
import { type profileData } from "@/schemas/api";
import { useState } from "react";
const Dashboard = () => {
  const [profile, setProfile] = useState<profileData>();
  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#131313]">
        {/* Navbar */}
        <NavBar />
        <div className="my-auto flex h-full p-8">
          <div className="flex flex-grow overflow-y-auto overflow-x-hidden p-4">
            <div className="mb-14 mt-12 flex flex-grow">
              <DashboardComponent setProfile={setProfile} />
            </div>
          </div>
          <div className=" ">
            <ProfileComponent profile={profile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

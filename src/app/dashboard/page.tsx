"use client";
import { type profileData } from "@/schemas/api";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import ProfileComponent from "@/components/profileComponent";
import DashboardComponent from "@/components/ui/dashboard";
const Dashboard = () => {
  const [profile, setProfile] = useState<profileData>();
  return (
    <>
      <div className="flex min-h-screen flex-col bg-zinc-900">
        {/* Navbar */}
        <NavBar />
        <div className="flex h-full">
          
          <div className="flex flex-grow overflow-y-auto p-4">
            <div className="mb-14 mt-12 flex flex-grow">
              <DashboardComponent setProfile={setProfile} />
            </div>
          </div>
          <div className="sticky top-0 mr-20 flex h-full w-80 bg-zinc-900 p-4">
            <ProfileComponent profile={profile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

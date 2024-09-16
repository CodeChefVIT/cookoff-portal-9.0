'use client';

import NavBar from '@/components/navBar/NavBar';
import ProfileComponent from '@/components/profileComponent';
import DashboardComponent from '../../components/ui/dashboard';

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="parent bg-zinc-900 min-h-screen flex flex-col justify-between overflow-y-auto xl:overflow-y-hidden">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mb-10 px-4 xl:px-0">
          <div className="wrapper flex-grow">
            <div className="mt-24 mb-14">
              <DashboardComponent />
            </div>
            <DashboardComponent />
          </div>
          <div className="xl:relative xl:right-16 xl:top-24 mx-auto xl:mx-0">
            <ProfileComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
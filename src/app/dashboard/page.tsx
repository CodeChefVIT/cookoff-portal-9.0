'use client';
import NavBar from '@/components/navBar/NavBar';
import ProfileComponent from '@/components/profileComponent';
import DashboardComponent from '../../components/ui/dashboard';
const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="parent bg-zinc-900 min-h-screen flex flex-col justify-between overflow-y-hidden">
        <div className="flex gap-12 mb-10">
          <div className="wrapper flex-grow">
            <div className="mt-24 mb-14">
              <DashboardComponent />
            </div>
            <DashboardComponent />
          </div>
          <div className="relative right-16 top-24">
            <ProfileComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import MainActions from "@/components/dashboard/MainActions";
import ActivityOverview from "@/components/dashboard/ActivityOverview";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import NavBar from "@/components/NavBar";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <MainActions/>
        <ActivityOverview/>
        
      </div>
    </>
  );
};

export default DashboardPage;

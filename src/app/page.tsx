

import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItsWorks from "@/components/landing/HowItsWorks";
import PricingSection from "@/components/landing/PricingSection";
import WhatToAsk from "@/components/landing/WhatToAsk";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "@/lib/action/user";

export default async function Home() {
  const user = await currentUser();
  await syncUser();
  if(user) redirect("/dashboard");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItsWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  ); 
}

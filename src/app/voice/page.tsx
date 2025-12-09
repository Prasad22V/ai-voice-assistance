import NavBar from "@/components/NavBar";
import FeauturedCard from "@/components/voice/FeauturedCard";
import ProPlanRequired from "@/components/voice/ProPlanRequired";
import VapiWidget from "@/components/voice/VapiWidget";
import WelcomeSection from "@/components/voice/WelcomeSection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function VoicePage() {
  const { has } = await auth();
  const hasProplan = has({ plan: "ai_basic" }) || has({ plan: "ai_pro" });
  if (!hasProplan) return <ProPlanRequired/>
  return <div className="min-h-screen bg-background">

    <NavBar/>
    <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection/>
        <FeauturedCard/>
    </div>
    <VapiWidget/>
  </div>;
}
 
export default VoicePage;
  
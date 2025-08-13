"use client";
import Navbar from "@/components/Navbar";
import ResumeWizard from "@/components/ResumeWizard";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="">
        <ResumeWizard />
      </div>
    </main>
  );
}

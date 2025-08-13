"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 bg-background w-full px-4 md:px-6 py-4 border-b">
      <div className="-z-10 absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-20 blur-3xl" />
      <div className="md:container md:mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/cv.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-lg md:text-xl font-bold">CV Builder</span>
        </div>

        <Button>Get Started</Button>
      </div>
    </nav>
  );
}

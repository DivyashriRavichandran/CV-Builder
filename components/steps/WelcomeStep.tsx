"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: Props) {
  const Features = [
    {
      icon: Sparkles,
      title: "Beautiful Templates",
      desc: "Choose from professionally designed templates",
    },
    {
      icon: FileText,
      title: "Guided Process",
      desc: "Step-by-step questions help you create a comprehensive cv",
    },
    {
      icon: Download,
      title: "Instant Download",
      desc: "Export your cv as a PDF ready for job applications",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative md:mx-auto md:container md:max-w-4xl flex flex-col space-y-5 md:space-y-10">
      {/* BG GRADIENT */}
      <div className="-z-20 absolute size-40 rounded-full top-0 right-0 md:hidden bg-gradient-to-b from-primary to-secondary opacity-20 blur-[80px]" />
      <div className="-z-20 absolute size-60 rounded-full top-1/4 -right-20 bg-gradient-to-b from-primary to-secondary opacity-20 blur-[80px]" />
      <div className="-z-20 absolute size-60 rounded-full bottom-0 -left-20 bg-gradient-to-b from-primary to-secondary opacity-20 blur-[80px]" />
      {/* HEADER */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/cv.png"
          alt="logo icon"
          className="size-20 mx-auto"
          width={80}
          height={80}
        />
        <h1 className="mt-4 md:mt-6 text-xl md:text-4xl font-bold">
          Create Your Perfect Curriculum Vitae
        </h1>
        <p className="mt-2 md:mt-4 text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Build a professional CV in minutes with our guided step-by-step
          process. Choose from beautiful templates and let us help you showcase
          your best self.
        </p>
      </motion.div>

      {/* FEATURES */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Features.map(({ icon: Icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="mx-4 items-center justify-center text-center p-6 bg-card">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ACTION BUTTON */}
      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button onClick={onNext} size="lg">
            Build CV
            <ArrowRight className="size-5" />
          </Button>
        </motion.div>
        <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-4">
          Takes about 5-10 minutes to complete
        </p>
      </motion.div>
    </div>
  );
}

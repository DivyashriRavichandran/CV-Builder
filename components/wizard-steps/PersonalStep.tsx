"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Lightbulb } from "lucide-react";
import ResumePreview, { PreviewSection } from "@/components/ResumePreview";
import type { ResumeData } from "@/models/ResumeData";
import HeaderText from "../HeaderText";
import { motion } from "framer-motion";

interface Props {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

export default function PersonalStep({ data, onDataChange }: Props) {
  const updateField = (field: keyof ResumeData, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const previewVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* BG GRADIENTS */}
      <div className="-z-20 absolute size-60 rounded-full top-40 -right-20 bg-gradient-to-b from-primary to-secondary opacity-20 blur-3xl" />

      {/* FORM */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants}>
          <HeaderText
            title="Tell Us About Yourself"
            description="Let's start with your basic information. This will appear at the top of your CV."
            className={"lg:text-left"}
          />
          <p className="flex gap-1 mt-4 text-sm bg-card text-muted-foreground rounded-lg p-3">
            <Lightbulb className="size-5" /> <strong>Tip:</strong> We've added
            sample information to show you how your CV will look. Simply replace
            it with your own details!
          </p>
        </motion.div>

        {/* PERSONAL INFO */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5 text-secondary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={data.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={data.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g., Software Engineer, Marketing Manager, Graphic Designer"
                />
                <p className="mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground">
                  This should match the type of role you're applying for
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CONTACT INFO */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="size-5 text-secondary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john.doe@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website/Portfolio (Optional)</Label>
                <Input
                  id="website"
                  value={data.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="https://johndoe.com or linkedin.com/in/johndoe"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SUMMARY */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={data.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                placeholder="Write a brief 2-3 sentence summary highlighting your key strengths, experience, and career goals..."
                rows={5}
                className="mt-0"
              />
              <p className="mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground">
                A compelling summary can help recruiters quickly understand your
                value proposition
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* PREVIEW SECTION */}
      <motion.div
        variants={previewVariants}
        initial="hidden"
        animate="visible"
        className="h-full"
      >
        <PreviewSection data={data} />
      </motion.div>
    </div>
  );
}

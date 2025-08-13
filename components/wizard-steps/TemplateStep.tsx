"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import type { ResumeData } from "@/models/ResumeData";
import ClassicCVImage from "@/assets/images/classic-cv.png";
import ModernCVImage from "@/assets/images/modern-cv.png";
import Image, { StaticImageData } from "next/image";
import HeaderText from "../HeaderText";
import { motion } from "framer-motion";

interface Props {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onNext: () => void;
}
interface TemplateProps {
  id: "classic" | "modern";
  name: string;
  description: string;
  features: string[];
  preview: StaticImageData;
}

export default function TemplateStep({ data, onDataChange }: Props) {
  const templates: TemplateProps[] = [
    {
      id: "classic",
      name: "Classic Professional",
      description: "Clean, traditional layout perfect for corporate roles",
      features: ["Single column", "Traditional styling", "ATS-friendly"],
      preview: ClassicCVImage,
    },
    {
      id: "modern",
      name: "Modern Creative",
      description: "Contemporary design with sidebar and accent colors",
      features: ["Two-column layout", "Color accents", "Modern typography"],
      preview: ModernCVImage,
    },
  ];

  const handleTemplateSelect = (templateId: "classic" | "modern") => {
    onDataChange({ ...data, template: templateId });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <div className="max-w-6xl mx-auto">
      <HeaderText
        title="Choose Your Template"
        description="Select a template that matches your industry and personal style. You can always change this later."
      />

      <motion.div
        className="mt-6 md:mt-10 grid md:grid-cols-2 gap-5 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {templates.map((template, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card
              className={`bg-card cursor-pointer transition-all border-2 ${
                data.template === template.id
                  ? "border-primary bg-gradient-to-br from-primary/30 to-secondary/30"
                  : ""
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent>
                {/* PREVIEW */}
                <div className="relative">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-80 object-top object-cover rounded-lg border"
                  />
                  {data.template === template.id && (
                    <div className="absolute top-4 right-4">
                      <Badge>
                        <Check className="size-4" />
                        Selected
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="mt-4">
                  <h3 className="text-lg md:text-2xl font-semibold">
                    {template.name}
                  </h3>
                  <p className="text-sm md:text-base md:mt-1 text-muted-foreground">
                    {template.description}
                  </p>

                  {/* FEATURES */}
                  <div className="mt-3 md:mt-4 flex gap-3">
                    <h4 className="font-medium text-sm md:text-base">
                      Features:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, idx) => (
                        <Badge key={idx}>{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

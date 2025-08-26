"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import WelcomeStep from "./steps/WelcomeStep";
import TemplateStep from "./steps/TemplateStep";
import PersonalStep from "./steps/PersonalStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import PreviewStep from "./steps/PreviewStep";
import type { ResumeData } from "@/models/ResumeData";
import { initialData } from "@/data/initial-data";
import Image from "next/image";

const steps = [
  { id: "welcome", title: "Welcome", component: WelcomeStep },
  { id: "template", title: "Template", component: TemplateStep },
  { id: "personal", title: "Personal Info", component: PersonalStep },
  { id: "experience", title: "Experience", component: ExperienceStep },
  { id: "education", title: "Education", component: EducationStep },
  { id: "skills", title: "Skills", component: SkillsStep },
  { id: "preview", title: "Preview", component: PreviewStep },
];

export default function CVBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<ResumeData>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || isEditing) {
      setCurrentStep(stepIndex);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentStep(1); // Go to template step when editing
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    setCurrentStep(steps.length - 1); // Go back to preview
  };

  const isWelcomeStep = currentStep === 0;
  const isPreviewStep = currentStep === steps.length - 1;

  return (
    <div>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-20 bg-background w-full px-4 md:px-6 py-4 border-b">
        <div className="-z-10 absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-20 blur-3xl" />
        <div className="md:container md:mx-auto flex items-center justify-between">
          <div
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image
              src="/cv.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-lg md:text-xl font-bold">CV Builder</span>
          </div>

          <Button onClick={() => setCurrentStep(0)}>Get Started</Button>
        </div>
      </nav>

      {/* HEADER */}
      {!isWelcomeStep && (
        <div className="top-0 z-50">
          <div className="md:container md:mx-auto px-4 pt-10 pb-6 border-b">
            {/* PROGRESS BAR */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>{steps[currentStep].title}</span>
              </div>
            </div>

            {/* NAVIGATION STEPS */}
            <div className="mt-2 md:mt-0 flex justify-center items-center gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`size-7 md:size-9 rounded-full text-sm font-medium transition-all  ${
                    index === currentStep
                      ? "bg-gradient-to-br from-primary to-secondary border"
                      : index < currentStep || isEditing
                      ? "bg-primary cursor-pointer hover:bg-accent/80"
                      : "bg-foreground text-card cursor-not-allowed"
                  }`}
                  disabled={index > currentStep && !isEditing}
                >
                  {index < currentStep ? "✓" : index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="md:container md:mx-auto px-4 py-8 mb-16">
        <CurrentStepComponent
          data={data}
          onDataChange={setData}
          onNext={handleNext}
          isEditing={isEditing}
          onFinishEditing={handleFinishEditing}
          previewRef={previewRef}
        />
      </div>

      {/* NAVIGATION FOOTER */}
      {!isWelcomeStep && !isPreviewStep && (
        <div className="fixed bottom-0 left-0 right-0 border-t p-4 bg-background">
          <div className="-z-10 absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-20 blur-3xl" />

          <div className="container mx-auto flex justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 0}
            >
              <ArrowLeft className="size-5" />
              Previous
            </Button>
            <Button onClick={isEditing ? handleFinishEditing : handleNext}>
              {isEditing
                ? "Finish Editing"
                : currentStep === steps.length - 2
                ? "Preview CV"
                : "Next"}
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

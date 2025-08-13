"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Download, Edit3 } from "lucide-react";
import WelcomeStep from "./wizard-steps/WelcomeStep";
import TemplateStep from "./wizard-steps/TemplateStep";
import PersonalStep from "./wizard-steps/PersonalStep";
import ExperienceStep from "./wizard-steps/ExperienceStep";
import EducationStep from "./wizard-steps/EducationStep";
import SkillsStep from "./wizard-steps/SkillsStep";
import PreviewStep from "./wizard-steps/PreviewStep";
import type { ResumeData } from "@/models/ResumeData";

const initialData: ResumeData = {
  firstName: "Alex",
  lastName: "Johnson",
  title: "Senior Software Engineer",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  website: "alexjohnson.dev",
  summary:
    "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading development teams to deliver high-quality software solutions.",
  experiences: [
    {
      id: 1,
      role: "Senior Software Engineer",
      company: "TechCorp Solutions",
      start: "2022",
      end: "Present",
      description:
        "• Led development of microservices architecture serving 1M+ users daily\n• Mentored junior developers and established coding standards for the team\n• Improved application performance by 45% through optimization and caching strategies\n• Collaborated with product managers to define technical requirements and roadmaps",
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "StartupXYZ",
      start: "2020",
      end: "2022",
      description:
        "• Built responsive web applications using React, TypeScript, and Node.js\n• Implemented CI/CD pipelines reducing deployment time by 60%\n• Designed and developed RESTful APIs handling 10K+ requests per minute\n• Worked closely with UX designers to create intuitive user interfaces",
    },
    {
      id: 3,
      role: "Junior Developer",
      company: "Digital Agency Inc",
      start: "2019",
      end: "2020",
      description:
        "• Developed client websites using modern web technologies\n• Participated in code reviews and agile development processes\n• Maintained and updated existing applications with new features\n• Collaborated with designers to implement pixel-perfect UI components",
    },
  ],
  education: [
    {
      id: 1,
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      start: "2015",
      end: "2019",
    },
    {
      id: 2,
      school: "Tech Bootcamp Academy",
      degree: "Full Stack Web Development Certificate",
      start: "2019",
      end: "2019",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "CI/CD",
    "Agile",
    "Team Leadership",
    "Problem Solving",
    "Communication",
  ],
  template: "classic",
};

const steps = [
  { id: "welcome", title: "Welcome", component: WelcomeStep },
  { id: "template", title: "Template", component: TemplateStep },
  { id: "personal", title: "Personal Info", component: PersonalStep },
  { id: "experience", title: "Experience", component: ExperienceStep },
  { id: "education", title: "Education", component: EducationStep },
  { id: "skills", title: "Skills", component: SkillsStep },
  { id: "preview", title: "Preview", component: PreviewStep },
];

export default function ResumeWizard() {
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

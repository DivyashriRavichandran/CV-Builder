"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Edit3, CheckCircle, Eye, EyeOff } from "lucide-react";
import ResumePreview, { PreviewSection } from "@/components/ResumePreview";
import { exportResumeAsPDF } from "@/lib/pdf";
import type { ResumeData } from "@/models/ResumeData";
import { useRef, useState } from "react";
import HeaderText from "../HeaderText";
import { cn } from "@/lib/utils";

interface Props {
  data: ResumeData;
  previewRef: React.RefObject<HTMLDivElement>;
  onFinishEditing?: () => void;
  isEditing?: boolean;
}

export default function PreviewStep({
  data,
  previewRef,
  onFinishEditing,
  isEditing,
}: Props) {
  const previewRef1 = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    exportResumeAsPDF(previewRef1.current, "resume");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* BG GRADIENTS */}
      <div className="absolute -z-20 size-60 rounded-full top-60 left-0 bg-gradient-to-b from-primary to-secondary opacity-20 blur-[100px]" />
      <div className="fixed -z-20 size-60 rounded-full top-1/2 -right-20 bg-gradient-to-b from-primary to-secondary opacity-20 blur-[100px]" />

      {!isEditing && (
        <div className="text-center space-y-2">
          <div className="text-4xl">🎉</div>
          <HeaderText
            title="Your CV is Ready!"
            description=" Congratulations! Your professional CV has been created. Review
            it below and download when you're satisfied."
          />
        </div>
      )}

      <div className="mt-5 md:mt-8 grid lg:grid-cols-4 gap-6">
        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent>
              <Button onClick={handleDownload} className="w-full">
                <Download className="size-4" />
                Download PDF
              </Button>

              {onFinishEditing && (
                <Button
                  onClick={onFinishEditing}
                  variant="outline"
                  className="mt-4 w-full gap-2 bg-transparent"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit CV
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CV Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Template:</span>
                <span className="font-medium capitalize">{data.template}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-medium">
                  {data.experiences.length} entries
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Education:</span>
                <span className="font-medium">
                  {data.education.length} entries
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Skills:</span>
                <span className="font-medium">{data.skills.length} skills</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-2xl">🎉</div>
                <p className="text-sm text-muted-foreground">
                  Your cv looks great! Good luck with your job search.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PREVIEW */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent>
              <div
                className={cn(
                  "border",
                  data.template === "classic" && "bg-foreground"
                )}
              >
                <div ref={previewRef1}>
                  <ResumePreview data={data} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

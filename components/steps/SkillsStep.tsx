"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CodeXml, Plus, X, Zap } from "lucide-react";
import ResumePreview, { PreviewSection } from "@/components/ResumePreview";
import type { ResumeData } from "@/models/ResumeData";
import HeaderText from "../HeaderText";

interface Props {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

export default function SkillsStep({ data, onDataChange }: Props) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    onDataChange({
      ...data,
      skills: [...data.skills, newSkill.trim()],
    });
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    onDataChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    });
  };

  const suggestedSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "TypeScript",
    "CSS",
    "HTML",
    "Git",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Figma",
    "Photoshop",
    "Project Management",
    "Communication",
    "Leadership",
    "Problem Solving",
  ];

  const addSuggestedSkill = (skill: string) => {
    if (!data.skills.includes(skill)) {
      onDataChange({
        ...data,
        skills: [...data.skills, skill],
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="space-y-6">
        <div>
          <HeaderText
            title=" Your Skills"
            description=" Add your technical skills, soft skills, and any other relevant
            abilities that make you a great candidate."
            className={"lg:text-left"}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-5 text-secondary" />
              Add Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., React, Java, Project Management"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  className="mt-0"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addSkill} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            </div>

            {data.skills.length > 0 && (
              <>
                <Label>Your Skills</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <Badge key={index} size={"md"}>
                      {skill}

                      <X
                        onClick={() => removeSkill(index)}
                        className="size-4 cursor-pointer hover:text-primary transition"
                      />
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CodeXml className="size-5 text-secondary" />
              Suggested Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-muted-foreground">
              Click on any skill below to add it to your resume:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestedSkills.map((skill) => (
                <Button
                  key={skill}
                  onClick={() => addSuggestedSkill(skill)}
                  variant="outline"
                  size="sm"
                  disabled={data.skills.includes(skill)}
                  className={`text-xs ${
                    data.skills.includes(skill)
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/80"
                  }`}
                >
                  {data.skills.includes(skill) ? "✓ " : "+ "}
                  {skill}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {data.skills.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Zap className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="mt-3 text-muted-foreground">
                Add some skills to see them appear in your resume preview
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* PREVIEW SECTION */}
      <PreviewSection data={data} />
    </div>
  );
}

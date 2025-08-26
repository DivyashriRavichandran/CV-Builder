"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Briefcase } from "lucide-react";
import ResumePreview, { PreviewSection } from "@/components/ResumePreview";
import type { ResumeData } from "@/models/ResumeData";
import HeaderText from "../HeaderText";

interface Props {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

export default function ExperienceStep({ data, onDataChange }: Props) {
  const [showAddForm, setShowAddForm] = useState(data.experiences.length === 0);

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      role: "",
      company: "",
      start: "",
      end: "",
      description: "",
    };
    onDataChange({
      ...data,
      experiences: [...data.experiences, newExp],
    });
    setShowAddForm(true);
  };

  const updateExperience = (id: number, field: string, value: string) => {
    onDataChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: number) => {
    onDataChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <HeaderText
            title=" Your Work Experience"
            description="Add your work history, starting with your most recent position.
            Include internships, freelance work, and volunteer experience."
            className={"lg:text-left"}
          />
        </div>

        {data.experiences.length === 0 ? (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="mt-3 text-xl font-semibold">
                No Experience Added Yet
              </h3>
              <p className="mt-2 text-muted-foreground">
                Add your first work experience to get started
              </p>
              <Button onClick={addExperience} className="mt-4 gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {data.experiences.map((exp, index) => (
              <Card key={exp.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="size-5 text-secondary" />
                      Experience #{index + 1}
                    </CardTitle>
                    <Button
                      onClick={() => removeExperience(exp.id)}
                      variant="ghost"
                      size="icon"
                      className="text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="size-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Job Title *</Label>
                      <Input
                        value={exp.role}
                        onChange={(e) =>
                          updateExperience(exp.id, "role", e.target.value)
                        }
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        placeholder="Acme Corporation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date *</Label>
                      <Input
                        value={exp.start}
                        onChange={(e) =>
                          updateExperience(exp.id, "start", e.target.value)
                        }
                        placeholder="Jan 2021"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={exp.end}
                        onChange={(e) =>
                          updateExperience(exp.id, "end", e.target.value)
                        }
                        placeholder="Present"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, "description", e.target.value)
                      }
                      placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Improved application performance by 40% through code optimization"
                      rows={5}
                    />
                    <p className="mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground">
                      Use bullet points to highlight your key achievements and
                      responsibilities
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* ADD NEW BUTTON */}
            <Button
              onClick={addExperience}
              variant="outline"
              className="w-full"
            >
              <Plus className="size-4" />
              Add Another Experience
            </Button>
          </div>
        )}
      </div>

      {/* PREVIEW SECTION */}
      <PreviewSection data={data} />
    </div>
  );
}

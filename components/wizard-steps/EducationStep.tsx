"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import ResumePreview, { PreviewSection } from "@/components/ResumePreview";
import type { ResumeData } from "@/models/ResumeData";
import HeaderText from "../HeaderText";

interface Props {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

export default function EducationStep({ data, onDataChange }: Props) {
  const addEducation = () => {
    const newEd = {
      id: Date.now(),
      school: "",
      degree: "",
      start: "",
      end: "",
    };
    onDataChange({
      ...data,
      education: [...data.education, newEd],
    });
  };

  const updateEducation = (id: number, field: string, value: string) => {
    onDataChange({
      ...data,
      education: data.education.map((ed) =>
        ed.id === id ? { ...ed, [field]: value } : ed
      ),
    });
  };

  const removeEducation = (id: number) => {
    onDataChange({
      ...data,
      education: data.education.filter((ed) => ed.id !== id),
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="space-y-6">
        <div>
          <HeaderText
            title="Your Education"
            description="Add your educational background, including degrees, certifications,
            and relevant coursework."
            className={"lg:text-left"}
          />
        </div>

        {data.education.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No Education Added Yet
              </h3>
              <p className="text-slate-500 mb-6">
                Add your educational background to strengthen your resume
              </p>
              <Button onClick={addEducation} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your Education
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {data.education.map((ed, index) => (
              <Card key={ed.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="size-6 text-secondary" />
                      Education #{index + 1}
                    </CardTitle>
                    <Button
                      onClick={() => removeEducation(ed.id)}
                      variant="ghost"
                      size="icon"
                      className="text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="size-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>School/University *</Label>
                    <Input
                      value={ed.school}
                      onChange={(e) =>
                        updateEducation(ed.id, "school", e.target.value)
                      }
                      placeholder="University of Technology"
                    />
                  </div>

                  <div>
                    <Label>Degree/Program *</Label>
                    <Input
                      value={ed.degree}
                      onChange={(e) =>
                        updateEducation(ed.id, "degree", e.target.value)
                      }
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Year</Label>
                      <Input
                        value={ed.start}
                        onChange={(e) =>
                          updateEducation(ed.id, "start", e.target.value)
                        }
                        placeholder="2016"
                      />
                    </div>
                    <div>
                      <Label>End Year</Label>
                      <Input
                        value={ed.end}
                        onChange={(e) =>
                          updateEducation(ed.id, "end", e.target.value)
                        }
                        placeholder="2020"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center">
              <Button
                onClick={addEducation}
                variant="outline"
                className="w-full"
              >
                <Plus className="size-4" />
                Add Another Education
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* PREVIEW SECTION */}
      <PreviewSection data={data} />
    </div>
  );
}

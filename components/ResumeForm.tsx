"use client"

import type { ResumeData } from "@/models/ResumeData"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"
import { Label } from "@/components/ui/label"

interface Props {
  data: ResumeData
  onChange: (d: ResumeData) => void
}

export default function ResumeForm({ data, onChange }: Props) {
  const [newSkill, setNewSkill] = useState("")

  const updateField = (k: keyof ResumeData, v: any) => onChange({ ...data, [k]: v } as ResumeData)

  const updateExperience = (id: number, partial: Partial<(typeof data.experiences)[0]>) => {
    updateField(
      "experiences",
      data.experiences.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    )
  }

  const addExperience = () => {
    const id = Date.now()
    updateField("experiences", [
      ...data.experiences,
      { id, role: "", company: "", start: "", end: "", description: "" },
    ])
  }

  const removeExperience = (id: number) => {
    updateField(
      "experiences",
      data.experiences.filter((e) => e.id !== id),
    )
  }

  const addEducation = () => {
    const id = Date.now()
    updateField("education", [...data.education, { id, school: "", degree: "", start: "", end: "" }])
  }

  const updateEducation = (id: number, partial: Partial<(typeof data.education)[0]>) => {
    updateField(
      "education",
      data.education.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    )
  }

  const removeEducation = (id: number) => {
    updateField(
      "education",
      data.education.filter((e) => e.id !== id),
    )
  }

  const addSkill = () => {
    if (!newSkill.trim()) return
    updateField("skills", [...data.skills, newSkill.trim()])
    setNewSkill("")
  }

  const removeSkill = (index: number) => {
    updateField(
      "skills",
      data.skills.filter((_, i) => i !== index),
    )
  }

  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsContent value="personal" className="space-y-4 mt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Software Engineer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder="https://johndoe.dev"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            placeholder="Brief description of your professional background and goals..."
            rows={4}
          />
        </div>
      </TabsContent>

      <TabsContent value="experience" className="space-y-4 mt-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <Button onClick={addExperience} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </div>

        <div className="space-y-4">
          {data.experiences.map((exp) => (
            <Card key={exp.id} className="border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Experience Entry</CardTitle>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={exp.start}
                      onChange={(e) => updateExperience(exp.id, { start: e.target.value })}
                      placeholder="Jan 2021"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={exp.end}
                      onChange={(e) => updateExperience(exp.id, { end: e.target.value })}
                      placeholder="Present"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="education" className="space-y-4 mt-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button onClick={addEducation} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {data.education.map((ed) => (
            <Card key={ed.id} className="border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Education Entry</CardTitle>
                  <Button
                    onClick={() => removeEducation(ed.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>School/University</Label>
                    <Input
                      value={ed.school}
                      onChange={(e) => updateEducation(ed.id, { school: e.target.value })}
                      placeholder="University of Technology"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={ed.degree}
                      onChange={(e) => updateEducation(ed.id, { degree: e.target.value })}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Year</Label>
                    <Input
                      value={ed.start}
                      onChange={(e) => updateEducation(ed.id, { start: e.target.value })}
                      placeholder="2016"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Year</Label>
                    <Input
                      value={ed.end}
                      onChange={(e) => updateEducation(ed.id, { end: e.target.value })}
                      placeholder="2020"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4 mt-0">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Skills</h3>

          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addSkill()
                }
              }}
            />
            <Button onClick={addSkill} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                {skill}
                <Button
                  onClick={() => removeSkill(index)}
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 text-slate-500 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

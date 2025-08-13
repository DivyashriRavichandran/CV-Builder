"use client";
import React from "react";
import type { ResumeData } from "@/models/ResumeData";

export const PreviewSection = ({ data }: { data: ResumeData }) => {
  return data.template == "classic" ? (
    <div
      className="bg-foreground"
      style={{
        width: "210mm",
        transform: "scale(0.7)",
        transformOrigin: "top left",
      }}
    >
      <ResumePreview data={data} />
    </div>
  ) : (
    <div
      style={{
        width: "210mm",
        transform: "scale(0.75)",
        transformOrigin: "top left",
      }}
    >
      <div className="border">
        <ResumePreview data={data} />
      </div>
    </div>
  );
};

export default function ResumePreview({ data }: { data: ResumeData }) {
  // MODERN
  if (data.template === "modern") {
    return (
      <div className="flex font-sans">
        {/* Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-neutral-800 to-neutral-900 text-white p-8">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">
                {`${data.firstName} ${data.lastName}`}
              </h1>
              <div className="mt-3 text-neutral-300 text-sm font-medium uppercase tracking-wide">
                {data.title}
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <div className="text-neutral-300">{data.email}</div>
                <div className="text-neutral-300">{data.phone}</div>
                {data.website && (
                  <div className="text-neutral-300">{data.website}</div>
                )}
              </div>
            </div>

            {data.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Skills
                </h3>
                <div className="space-y-2">
                  {data.skills.map((skill, i) => (
                    <div key={i} className="text-sm text-neutral-300">
                      • {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8 bg-white">
          <div className="space-y-6">
            {data.summary && (
              <div>
                <h2 className="text-xl font-bold text-neutral-800 mb-3 pb-2 border-b-2 border-neutral-200">
                  Professional Summary
                </h2>
                <p className="text-neutral-700 text-sm">{data.summary}</p>
              </div>
            )}

            {data.experiences.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-neutral-800 mb-4 pb-2 border-b-2 border-neutral-200">
                  Experience
                </h2>
                <div className="space-y-4">
                  {data.experiences.map((exp, index) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-neutral-800">
                            {exp.role}
                          </h3>
                          <div className="text-neutral-600 font-medium">
                            {exp.company}
                          </div>
                        </div>
                        <div className="text-sm text-neutral-500 font-medium">
                          {exp.start} - {exp.end || "Present"}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-neutral-800 mb-4 pb-2 border-b-2 border-neutral-200">
                  Education
                </h2>
                <div className="space-y-3">
                  {data.education.map((ed) => (
                    <div
                      key={ed.id}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-semibold text-neutral-800">
                          {ed.school}
                        </h3>
                        <div className="text-neutral-600">{ed.degree}</div>
                      </div>
                      <div className="text-sm text-neutral-500 font-medium">
                        {ed.start} - {ed.end || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // CLASSIC
  return (
    <div
      className="space-y-6 font-sans text-neutral-900"
      style={{ padding: "15mm" }}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">
          {data.firstName} {data.lastName}
        </h1>
        <div className="text-lg text-neutral-600 font-medium mb-3">
          {data.title}
        </div>
        <div className="flex justify-center items-center gap-4 text-sm text-neutral-600">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          {data.website && (
            <>
              <span>•</span>
              <span>{data.website}</span>
            </>
          )}
        </div>
      </div>

      {data.summary && (
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-3 pb-2 border-b border-neutral-300">
            Professional Summary
          </h2>
          <p className="text-neutral-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experiences.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-300">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp, index) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-neutral-800 text-lg">
                      {exp.role}
                    </h3>
                    <div className="text-neutral-600 font-medium">
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-sm text-neutral-500 font-medium">
                    {exp.start} - {exp.end || "Present"}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-300">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((ed) => (
              <div key={ed.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-neutral-800">
                    {ed.school}
                  </h3>
                  <div className="text-neutral-600">{ed.degree}</div>
                </div>
                <div className="text-sm text-neutral-500 font-medium">
                  {ed.start} - {ed.end || ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-300">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-neutral-200 text-neutral-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { ResumeData } from "@/models/ResumeData";

export const initialData: ResumeData = {
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

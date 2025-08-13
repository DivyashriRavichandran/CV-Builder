export interface ResumeData {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  website?: string;
  summary?: string;
  experiences: Array<{
    id: number;
    role: string;
    company: string;
    start: string;
    end?: string;
    description?: string;
  }>;
  education: Array<{
    id: number;
    school: string;
    degree: string;
    start: string;
    end?: string;
  }>;
  skills: string[];
  template: "classic" | "modern";
}

import type { Metadata } from "next";
import Image from "next/image";
import {
  MapPin, Mail, Phone, Briefcase, GraduationCap,
  Download, ExternalLink, Instagram, Linkedin,
} from "lucide-react";

export const metadata: Metadata = { title: "Profile – Vignesh Udhayakumar" };

const INSTAGRAM = process.env.INSTAGRAM_PROFILE_LINK ?? "#";
const LINKEDIN  = process.env.LINKED_PROFILE_LINK   ?? "#";
const PROFILE_IMG = `/${process.env.VICKY_PROFILE_IMAGE_FIE_NAME ?? "vicky_profile_picture.png"}`;

const EXPERIENCE = [
  {
    role: "Senior Data Science Associate Engineer",
    company: "Gramener Technology Solutions Pvt Ltd",
    period: "Feb 2024 – Present",
    highlights: [
      "Built AI-powered web monitoring & data extraction platform using Scrapy, Selenium, and AWS Textract",
      "Integrated Azure OpenAI and Hugging Face LLMs to intelligently summarise and contextualise documents",
      "Designed differential analytics engine surfacing state-level changes across all 50 U.S. states",
      "Built scalable Pandas pipelines for large CSV/XLSX datasets with OpenAI-based semantic column mapping",
      "Stored cleansed data in PostgreSQL with serverless workflows on AWS Lambda and DynamoDB",
    ],
    stack: ["Python", "Scrapy", "Selenium", "AWS", "OpenAI", "Hugging Face", "PostgreSQL"],
  },
  {
    role: "Senior Software Engineer",
    company: "Concertante Labs LLP",
    period: "Sep 2019 – Jan 2024",
    highlights: [
      "Led end-to-end development of ConcertoAI, an intelligent front-desk automation chatbot",
      "Implemented appointment scheduling, rescheduling & cancellation providing 24/7 client access",
      "Integrated LLM-based conversational AI (OpenAI) with custom workflows for complex enquiries",
      "Architected FastAPI backend on AWS ensuring scalability and high availability for real-time interactions",
    ],
    stack: ["Python", "FastAPI", "MongoDB", "Jenkins", "Docker", "Redis"],
  },
];

const SKILLS = [
  { category: "Languages",     items: ["Python", "SQL", "Bash"] },
  { category: "Frameworks",    items: ["FastAPI", "Django", "Flask"] },
  { category: "AI / LLMs",     items: ["OpenAI GPT", "Hugging Face", "LangChain", "Rasa"] },
  { category: "Data Science",  items: ["Pandas", "NumPy", "scikit-learn", "TensorFlow"] },
  { category: "Cloud",         items: ["AWS EC2", "S3", "Lambda", "API Gateway", "Azure OpenAI"] },
  { category: "Databases",     items: ["PostgreSQL", "MySQL", "SQLite", "DynamoDB", "MongoDB"] },
  { category: "DevOps",        items: ["Docker", "Git", "CI/CD", "Terraform"] },
  { category: "Web Scraping",  items: ["Scrapy", "Selenium", "BeautifulSoup", "PyTesseract"] },
];

const EDUCATION = [
  {
    degree: "B.Sc – Computer Science",
    school: "Thiruvalluvar University",
    period: "Jun 2013 – May 2016",
    note: "Specialization in Computer Science",
  },
  {
    degree: "Higher Secondary – 12th",
    school: "Sri Narayani Vidyalaya",
    period: "Jun 2012 – May 2013",
    note: "Relevant coursework in Computer Science",
  },
];

const LANGUAGES = [
  "English (Fluent)", "Tamil (Fluent)",
  "Telugu (Proficient)", "Kannada (Proficient)", "Hindi (Basic)",
];

const CERTS = [
  "Certified Backend Developer (CBD)",
  "Pursuing – Certified Data Scientist (CDA)",
];

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

      {/* ── Hero card ── */}
      <div className="card p-8 mb-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div
          className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0"
          style={{ border: "2px solid var(--brand-border)" }}
        >
          <Image
            src={PROFILE_IMG}
            alt="Vignesh Udhayakumar"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="section-label mb-1">Profile</p>
          <h1
            className="text-3xl font-bold mb-1"
            style={{ color: "var(--text-bright)", fontFamily: "var(--font-display)" }}
          >
            Vignesh Udhayakumar
          </h1>
          <p className="text-teal-400 font-medium mb-4">Senior Data Science &amp; Backend Engineer</p>

          <div
            className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm mb-5"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-teal-400" /> Bangalore, India
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-teal-400" /> vignesh.loveudhayakumar@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={13} className="text-teal-400" /> +91 86604 81625
            </span>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <a
              href="/Vignesh_Resume_Updated_6x.pdf"
              download
              className="btn-primary text-sm gap-2"
            >
              <Download size={14} /> Download Resume
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm gap-2"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm gap-2"
            >
              <Instagram size={14} /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {/* ── Main column ── */}
        <div className="md:col-span-2 space-y-8">

          {/* Bio */}
          <div>
            <p className="section-label mb-3">About</p>
            <p className="leading-relaxed" style={{ color: "var(--text)" }}>
              Experienced Backend Developer with nearly{" "}
              <strong style={{ color: "var(--brand)" }}>6 years</strong> of hands-on experience
              designing, developing, and maintaining scalable web applications. Highly proficient in
              Python and backend frameworks such as FastAPI, Django, and Flask. Strong expertise in
              AWS cloud architecture with additional specialization in AI integrations using OpenAI
              APIs. Solid background in data science, machine learning model development, and advanced
              debugging — adept at delivering high-quality code and collaborating in agile environments.
            </p>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={14} style={{ color: "var(--brand)" }} />
              <p className="section-label">Work Experience</p>
            </div>
            <div className="space-y-4">
              {EXPERIENCE.map((e) => (
                <div key={e.role} className="card p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <span className="font-semibold text-sm" style={{ color: "var(--text-bright)" }}>
                      {e.role}
                    </span>
                    <span
                      className="text-xs flex-shrink-0"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {e.period}
                    </span>
                  </div>
                  <p className="text-xs text-teal-400 mb-3">{e.company}</p>
                  <ul className="space-y-1.5 mb-3">
                    {e.highlights.map((h) => (
                      <li key={h} className="text-sm flex gap-2" style={{ color: "var(--text-muted)" }}>
                        <span className="text-teal-400 flex-shrink-0 mt-0.5">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="flex flex-wrap gap-1.5 pt-2"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    {e.stack.map((t) => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={14} style={{ color: "var(--brand)" }} />
              <p className="section-label">Education</p>
            </div>
            <div className="space-y-3">
              {EDUCATION.map((e) => (
                <div key={e.degree} className="card p-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-0.5">
                    <span className="font-semibold text-sm" style={{ color: "var(--text-bright)" }}>
                      {e.degree}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {e.period}
                    </span>
                  </div>
                  <p className="text-xs text-teal-400 mb-1">{e.school}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{e.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">

          {/* Skills */}
          <div className="card p-5">
            <p className="section-label mb-4">Skills</p>
            <div className="space-y-3">
              {SKILLS.map(({ category, items }) => (
                <div key={category}>
                  <p className="text-xs font-medium mb-1.5 text-teal-400">{category}</p>
                  <div className="flex flex-wrap gap-1">
                    {items.map((s) => (
                      <span key={s} className="tag text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="card p-5">
            <p className="section-label mb-3">Languages</p>
            <div className="space-y-1.5">
              {LANGUAGES.map((l) => (
                <p key={l} className="text-sm" style={{ color: "var(--text-muted)" }}>· {l}</p>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="card p-5">
            <p className="section-label mb-3">Certifications</p>
            <div className="space-y-1.5">
              {CERTS.map((c) => (
                <p key={c} className="text-sm" style={{ color: "var(--text-muted)" }}>· {c}</p>
              ))}
            </div>
          </div>

          {/* View resume inline */}
          <a
            href="/Vignesh_Resume_Updated_6x.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost justify-center text-sm w-full gap-2"
          >
            <ExternalLink size={13} /> View Resume PDF
          </a>
        </div>
      </div>
    </div>
  );
}

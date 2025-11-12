"use client";

import { cn } from "@/lib/utils";

type Candidate = {
  id: string;
  name: string;
  company: string;
  role: string;
  title: string;
  stage: "Open" | "Online Interview" | "Make an offer";
  stageDots: number;
  recruiter: string; // initial
  muted?: boolean;
};

const data: Candidate[] = [
  {
    id: "1",
    name: "Mahesh Murthy",
    company: "Amazon",
    role: "Senior Developer",
    title: "Engineer",
    stage: "Open",
    stageDots: 1,
    recruiter: "R",
  },
  {
    id: "2",
    name: "Nikolas Thamus",
    company: "Amazon",
    role: "Technical Architect",
    title: "Engineer",
    stage: "Make an offer",
    stageDots: 5,
    recruiter: "R",
  },
  {
    id: "3",
    name: "Sridevi Prasad",
    company: "Amazon",
    role: "Senior Developer",
    title: "Engineer",
    stage: "Online Interview",
    stageDots: 2,
    recruiter: "R",
  },
  {
    id: "4",
    name: "Sriram Kumar",
    company: "Cognizant Technology Solutions",
    role: "Senior Developer",
    title: "Engineer",
    stage: "Open",
    stageDots: 1,
    recruiter: "A",
    muted: true,
  },
  {
    id: "5",
    name: "Sue Dylan",
    company: "Amazon",
    role: "Technical Architect",
    title: "Engineer",
    stage: "Open",
    stageDots: 1,
    recruiter: "R",
  },
  {
    id: "6",
    name: "Vignesh V",
    company: "Amazon",
    role: "UX Designer",
    title: "Design",
    stage: "Open",
    stageDots: 1,
    recruiter: "R",
  },
];

export default function CandidatesTable() {
  return (
    <ul className="divide-y divide-[var(--color-border)]">
      {data.map((c) => (
        <li
          key={c.id}
          className={cn(
            "px-4 py-4 hover:bg-[oklch(0.985_0_0)] transition-colors",
            c.muted && "opacity-70"
          )}
        >
          <div className="grid grid-cols-[1.2fr_1fr_1fr_120px] items-center gap-4">
            {/* Candidate */}
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-[oklch(0.9_0_0)] grid place-items-center text-[oklch(0.45_0_0)] font-semibold">
                {c.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="truncate">
                  <a
                    href="#"
                    className="text-[color:var(--brand-primary)] font-medium hover:underline"
                  >
                    {c.name}
                  </a>
                </div>
                <div className="text-sm text-[oklch(0.45_0_0)] truncate">
                  {c.company}
                </div>
              </div>
            </div>

            {/* Applied For */}
            <div className="min-w-0">
              <div className="text-[oklch(0.3_0_0)]">{c.role}</div>
              <div className="text-sm text-[oklch(0.45_0_0)]">{c.title}</div>
            </div>

            {/* Stages */}
            <div className="flex items-center gap-3">
              <span className="text-[oklch(0.35_0_0)]">{c.stage}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filledColor =
                    c.stage === "Make an offer"
                      ? "bg-[oklch(0.62_0.25_300)] border-[oklch(0.62_0.25_300)]" // purple
                      : c.stage === "Online Interview"
                      ? "bg-[oklch(0.8_0.18_70)] border-[oklch(0.8_0.18_70)]" // orange
                      : "bg-[oklch(0.72_0.14_145)] border-[oklch(0.72_0.14_145)]"; // green for Open
                  return (
                    <span
                      key={i}
                      className={cn(
                        "size-3 rounded-full border border-[oklch(0.86_0_0)] inline-block", // soften border to match screenshot
                        i < c.stageDots && filledColor
                      )}
                      aria-hidden
                    />
                  );
                })}
              </div>
            </div>

            {/* Recruiter */}
            <div className="justify-self-start">
              <div className="size-8 rounded-full bg-[oklch(0.88_0.08_150)] grid place-items-center text-[oklch(0.3_0_0)] font-semibold">
                {c.recruiter}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

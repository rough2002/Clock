import CandidatesTable from "@/components/candidates-table";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Plus,
  Search,
  Settings,
  Home,
  BriefcaseBusiness,
  Users,
  User,
} from "lucide-react";

export default function AtsLayout() {
  return (
    <div className="grid grid-cols-[72px_1fr] grid-rows-[56px_1fr] h-dvh ">
      {/* Sidebar */}
      <aside className="row-span-2 bg-[oklch(0.2_0_0)] text-white h-full">
        {/* Replace placeholder squares with actual icons to match the screenshot’s left rail */}
        <nav className="flex flex-col items-center gap-5 pt-4">
          <button
            aria-label="Home"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <Home size={22} />
          </button>
          <button
            aria-label="Jobs"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <BriefcaseBusiness size={22} />
          </button>

          <button
            aria-label="My Referrals"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <Users size={22} />
          </button>
          <div className="mt-auto" />
          <button
            aria-label="Settings"
            className="opacity-80 hover:opacity-100 transition-opacity mb-6"
          >
            <Settings size={22} />
          </button>
        </nav>
      </aside>

      {/* Top bar */}
      <header className="col-start-2 bg-[oklch(0.98_0_0)] border-b border-[var(--color-border)]">
        <div className="h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Use a red circular logo mark with a white user icon to echo the “Pyramid Brews” avatar in the screenshot */}
            <div className="flex items-center gap-2">
              <span className="inline-grid place-items-center size-7 rounded-full bg-[oklch(0.62_0.16_17)]">
                <User className="size-4 text-white" aria-hidden />
              </span>
              <div className="text-[oklch(0.2_0_0)] font-semibold">
                Pyramid Brews
              </div>
            </div>
            {/* Style active 'Candidates' tab with soft red and subtle underline look */}
            <nav className="hidden md:flex items-center gap-6 text-[oklch(0.4_0_0)]">
              <a href="#" className="hover:text-[oklch(0.2_0_0)]">
                Jobs
              </a>
              <a
                href="#"
                className="relative font-medium text-[color:var(--brand-active)] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-[color:var(--brand-active)]"
              >
                Candidates
              </a>
              <a href="#" className="hover:text-[oklch(0.2_0_0)]">
                Talent Pool
              </a>
              <a href="#" className="hover:text-[oklch(0.2_0_0)]">
                My Referrals
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="p-2 rounded-lg hover:bg-[oklch(0.95_0_0)]"
            >
              <Search className="size-5 text-[oklch(0.4_0_0)]" />
            </button>
            {/* Make New button closer to screenshot (dark bluish with white text) */}
            <Button
              variant="secondary"
              className="bg-[oklch(0.42_0.05_240)] text-white hover:bg-[oklch(0.38_0.05_240)]"
            >
              <Plus className="mr-1.5 size-4" /> New
            </Button>
            <button
              aria-label="Notifications"
              className="p-2 rounded-lg hover:bg-[oklch(0.95_0_0)]"
            >
              <Bell className="size-5 text-[oklch(0.4_0_0)]" />
            </button>
            <button
              aria-label="Settings"
              className="p-2 rounded-lg hover:bg-[oklch(0.95_0_0)]"
            >
              <Settings className="size-5 text-[oklch(0.4_0_0)]" />
            </button>
            <div
              aria-label="Profile"
              className="ml-1 size-8 rounded-full bg-[oklch(0.9_0_0)] grid place-items-center text-[oklch(0.38_0_0)] font-semibold"
            >
              A
            </div>
          </div>
        </div>

        {/* Sub header row like screenshot */}
        <div className="h-11 border-t border-[var(--color-border)] flex items-center px-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-[oklch(0.93_0_0)] text-[oklch(0.35_0_0)]">
              All Candidates (8)
            </div>
            <span className="text-[oklch(0.6_0_0)]">|</span>
            <div className="text-[oklch(0.5_0_0)]">Sort by</div>
            <button className="text-[oklch(0.35_0_0)] font-medium">
              First Name ▾
            </button>
          </div>
        </div>
      </header>

      {/* Main content area without right filter */}
      {/* Keep teal header bar on table with white text as in screenshot */}
      <section className="col-start-2 overflow-hidden bg-[oklch(0.97_0_0)]">
        <div className="px-6 py-4">
          <div className="rounded-t-lg bg-[color:var(--brand-accent)] text-[color:var(--brand-accent-foreground)] font-medium h-10 flex items-center px-4">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_120px] w-full">
              <div>Candidates</div>
              <div>Applied For</div>
              <div>Stages</div>
              <div>Recruiter</div>
            </div>
          </div>

          <div className="rounded-b-lg bg-[oklch(1_0_0)] border border-[var(--color-border)]">
            <CandidatesTable />
          </div>
        </div>
      </section>
    </div>
  );
}

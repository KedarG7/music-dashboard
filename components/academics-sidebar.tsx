"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

type AcademicsSidebarProps = {
  pageTitle: string
  subsections: readonly string[]
}

export function AcademicsSidebar({ pageTitle, subsections }: AcademicsSidebarProps) {
  const [activeSection, setActiveSection] = useState(subsections[0] ?? pageTitle)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="grid min-w-0 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 bg-slate-50/80 lg:border-r lg:border-b-0">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="academics-subsections"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-[#102f63] transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-800/30 lg:hidden"
        >
          <span>{activeSection}</span>
          <ChevronDown className={`size-4 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`} />
        </button>

        <nav
          id="academics-subsections"
          aria-label={`${pageTitle} subsections`}
          className={`${mobileOpen ? "grid" : "hidden"} gap-1 px-3 pb-3 lg:grid lg:px-3 lg:py-4`}
        >
          <p className="hidden px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 lg:block">{pageTitle}</p>
          {subsections.map((section) => {
            const active = activeSection === section
            return (
              <button
                key={section}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveSection(section)
                  setMobileOpen(false)
                }}
                className={`group flex min-h-10 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800/30 motion-reduce:transition-none ${active ? "bg-[#102f63] font-semibold text-white shadow-sm" : "text-slate-600 hover:translate-x-0.5 hover:bg-blue-50 hover:text-[#102f63]"}`}
              >
                <span>{section}</span>
                <ChevronRight className={`size-4 shrink-0 transition-transform duration-200 ${active ? "text-blue-200" : "text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-800"}`} />
              </button>
            )
          })}
        </nav>
      </aside>

      <section aria-live="polite" className="min-h-72 px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-800">{pageTitle}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{activeSection}</h2>
        <div className="mt-5 h-px bg-slate-100" />
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-sm font-semibold text-slate-800">{activeSection}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Content coming soon.</p>
        </div>
      </section>
    </div>
  )
}

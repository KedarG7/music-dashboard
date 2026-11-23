import Link from "next/link"
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react"

import { academicsLinks } from "@/lib/academics"
import { AcademicsSidebar } from "@/components/academics-sidebar"

export function AcademicsPage({ href }: { href: (typeof academicsLinks)[number]["href"] }) {
  const currentIndex = academicsLinks.findIndex((link) => link.href === href)
  const page = academicsLinks[currentIndex]
  const previous = academicsLinks[(currentIndex - 1 + academicsLinks.length) % academicsLinks.length]
  const next = academicsLinks[(currentIndex + 1) % academicsLinks.length]

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f7faff_0%,#fff_48%,#f2f6fc_100%)] px-5 py-16 text-slate-900 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition hover:text-[#102f63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800/30">
          <ArrowLeft className="size-4" /> Back to SIGCE
        </Link>

        <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:mt-14">
          <div className="relative overflow-hidden bg-[#102f63] px-6 py-12 text-white sm:px-12 sm:py-16">
            <div aria-hidden="true" className="absolute -right-12 -top-28 size-72 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -right-2 -top-16 size-52 rounded-full border border-white/10" />
            <div className="relative flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <GraduationCap className="size-6" strokeWidth={1.6} />
            </div>
            <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">SIGCE · Academics</p>
            <h1 className="relative mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">{page.title}</h1>
          </div>

          <AcademicsSidebar pageTitle={page.title} subsections={page.subsections} />
          <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-12">
              <Link href={previous.href} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#102f63]"><ArrowLeft className="size-4" /> {previous.title}</Link>
              <Link href={next.href} className="inline-flex items-center gap-2 self-start rounded-full bg-[#102f63] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 sm:self-auto">{next.title}<ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </div>
    </main>
  )
}

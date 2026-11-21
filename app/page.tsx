
"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  Cpu,
  GraduationCap,
  Home,
  Lightbulb,
  MapPin,
  Microscope,
  Monitor,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"

type CarouselController = {
  on: (event: "select", listener: () => void) => void
  scrollTo: (index: number) => void
  selectedScrollSnap: () => number
}

const navigationItems = [
  { title: "About us", href: "#why-sigce", icon: ShieldCheck, links: ["Why SIGCE", "Our values", "Leadership"] },
  { title: "Academics", href: "#courses", icon: GraduationCap, links: ["Programs", "Academic calendar", "Examinations"] },
  { title: "Departments", href: "#courses", icon: Building2, links: ["Computer engineering", "Artificial intelligence", "Mechanical engineering"] },
  { title: "Admissions", href: "#admissions", icon: BookOpen, links: ["How to apply", "Eligibility", "Fee structure"] },
  { title: "Students", href: "#testimonials", icon: Users, links: ["Student life", "Clubs & committees", "Student support"] },
  { title: "Research", href: "#why-sigce", icon: Microscope, links: ["Research facilities", "Innovation", "Publications"] },
  { title: "Campus life", href: "#events", icon: Sparkles, links: ["Events", "Campus facilities", "Gallery"] },
]

const announcements = [
  "FE Institute Level Admission Schedule 2026–27",
  "MHT CET A-CAP Merit List",
  "New Admission Registration is now open",
  "Academic calendar for the upcoming semester",
]

const courses = [
  { title: "Computer Engineering", lead: "Dr. Kishor T. Patil", icon: Monitor, note: "Build what’s next" },
  { title: "Artificial Intelligence & Data Science", lead: "Dr. Shankar Madhav Patil", icon: Cpu, note: "Make intelligence useful" },
  { title: "Electronics & Computer Science", lead: "Prof. Amol Deshmukh", icon: Lightbulb, note: "Connect ideas to impact" },
  { title: "Mechanical Engineering", lead: "Prof. Vishwadeep Sardare", icon: Wrench, note: "Design a better world" },
  { title: "Information Technology", lead: "Prof. Neha Kulkarni", icon: BookOpen, note: "Turn data into direction" },
  { title: "Artificial Intelligence & Machine Learning", lead: "Prof. Sonali Deshpande", icon: Microscope, note: "Explore new frontiers" },
]

const events = [
  { day: "16", month: "MAR", category: "Workshop", title: "AI & the future of engineering", detail: "A hands-on student workshop" },
  { day: "29", month: "MAR", category: "Campus", title: "Ideas, collaboration, impact", detail: "Celebrating our SIGCE community" },
  { day: "08", month: "APR", category: "Innovation", title: "Build-a-thon: make it matter", detail: "A day of making and mentorship" },
  { day: "22", month: "APR", category: "Seminar", title: "Designing tomorrow together", detail: "Meet the people shaping what’s next" },
]

const galleryTiles = [
  { label: "A community of curious minds", color: "from-blue-900 via-indigo-800 to-sky-500", number: "01" },
  { label: "Ideas take the stage", color: "from-violet-900 via-purple-700 to-fuchsia-400", number: "02" },
  { label: "Learning by doing", color: "from-cyan-900 via-teal-700 to-emerald-400", number: "03" },
  { label: "A campus full of possibility", color: "from-amber-900 via-orange-700 to-rose-400", number: "04" },
]

const benefits = [
  ["Start-up incubation", "A place for early ideas to become ambitious, useful ventures."],
  ["A future-ready campus", "Modern learning spaces in the heart of Navi Mumbai."],
  ["Industry collaboration", "Learn alongside mentors and partners working in the real world."],
  ["Hands-on labs", "Make, test, and improve your ideas with practical experience."],
  ["Emerging technology", "Explore AI, data, and new technologies with purpose."],
  ["Career preparation", "Build confidence and skills for the work you want to do."],
]

const stats = [
  { number: "95%", label: "student success", icon: GraduationCap },
  { number: "65+", label: "expert faculty", icon: Users },
  { number: "50+", label: "company connections", icon: Building2 },
  { number: "1,000+", label: "bright futures", icon: Award },
]

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  light?: boolean
}) {
  return (
    <div className={`mx-auto mb-12 max-w-2xl text-center ${light ? "text-white" : "text-slate-950"}`}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-blue-200" : "text-blue-800"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className={`mx-auto mt-4 h-1 w-16 rounded-full ${light ? "bg-blue-300" : "bg-blue-800"}`} />
      {description && (
        <p className={`mt-5 text-sm leading-7 sm:text-base ${light ? "text-blue-100/80" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default function Page() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [subscribed, setSubscribed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [loaderLeaving, setLoaderLeaving] = useState(false)
  const heroApi = useRef<CarouselController | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const leaveTimer = window.setTimeout(
      () => setLoaderLeaving(true),
      reducedMotion ? 0 : 1450,
    )
    const removeTimer = window.setTimeout(
      () => setShowLoader(false),
      reducedMotion ? 100 : 1980,
    )

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  const handleHeroApi = useCallback((api: CarouselController) => {
    heroApi.current = api
    setActiveHeroSlide(api.selectedScrollSnap())
    api.on("select", () => setActiveHeroSlide(api.selectedScrollSnap()))
  }, [])

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
    <main
      aria-hidden={showLoader}
      inert={showLoader}
      className={`min-h-screen overflow-x-clip bg-white text-slate-900 ${showLoader ? "page-content-loading" : "page-content-ready"}`}
    >
      <header className="relative isolate overflow-hidden border-b border-slate-100 bg-[linear-gradient(115deg,#f7faff_0%,#fff_48%,#f2f6fc_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 size-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-5 py-5 sm:py-6">
          <div className="glass-panel relative flex size-14 shrink-0 items-center justify-center rounded-[1.2rem] text-[#102f63] sm:size-16">
            <GraduationCap className="size-8 sm:size-9" strokeWidth={1.6} />
            <span className="absolute -bottom-1 rounded-full bg-[#102f63] px-2 py-0.5 text-[8px] font-bold tracking-widest text-white">SIGCE</span>
          </div>
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-800 sm:text-xs">Smt. Indira Gandhi</p>
            <h1 className="mt-1 text-base font-bold leading-tight tracking-tight text-slate-950 sm:text-2xl">College of Engineering</h1>
            <p className="mt-1 hidden text-[10px] text-slate-500 sm:block sm:text-xs">An Autonomous Institute · Affiliated to the University of Mumbai</p>
          </div>
        </div>
      </header>

      <nav aria-label="Main navigation" className="sticky top-0 z-50 border-y border-white/60 bg-white/65 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-[4.5rem] items-center justify-between gap-4">
            <Link href="#home" aria-label="SIGCE home" className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#102f63] transition hover:bg-blue-50">
              <Home className="size-[18px]" />
            </Link>

            <NavigationMenu className="hidden flex-1 justify-center lg:flex">
              <NavigationMenuList className="flex flex-nowrap gap-0">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavigationMenuItem key={item.title} className="">
                      <NavigationMenuTrigger className="h-10 whitespace-nowrap rounded-lg bg-transparent px-2.5 text-[11px] font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-[#102f63] data-open:bg-blue-50 data-open:text-[#102f63]">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="">
                        <div className="glass-panel w-64 rounded-xl p-3">
                          <div className="mb-2 flex items-center gap-3 border-b border-slate-100 px-2 pb-3">
                            <span className="rounded-lg bg-blue-50 p-2 text-blue-900"><Icon className="size-4" /></span>
                            <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                          </div>
                          {item.links.map((label) => (
                            <NavigationMenuLink key={label} href={item.href} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-900">
                              {label}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden shrink-0 items-center gap-5 lg:flex">
              <a href="mailto:contactus@sigce.edu.in" className="text-xs font-semibold text-slate-600 transition hover:text-blue-900">Get in touch</a>
              <Link href="#admissions" className="inline-flex items-center gap-2 rounded-full bg-[#102f63] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-900">
                Apply now <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="group relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-[#102f63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800/30 lg:hidden"
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className={`absolute h-px w-[18px] rounded-full bg-current transition duration-300 ease-out motion-reduce:transition-none ${mobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px]"}`} />
              <span aria-hidden="true" className={`absolute h-px w-[18px] rounded-full bg-current transition duration-200 ease-out motion-reduce:transition-none ${mobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
              <span aria-hidden="true" className={`absolute h-px w-[18px] rounded-full bg-current transition duration-300 ease-out motion-reduce:transition-none ${mobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>

          <div
            id="mobile-navigation"
            aria-hidden={!mobileMenuOpen}
            inert={!mobileMenuOpen}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden ${mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="glass-panel mt-1 rounded-b-2xl border-t border-slate-100/80 px-2 py-3">
                <div className="grid">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ transitionDelay: mobileMenuOpen ? `${index * 25}ms` : "0ms" }}
                      className={`group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition duration-200 hover:bg-blue-50 hover:text-[#102f63] motion-reduce:transition-none ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight className="size-4 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-800" />
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-3 pt-4">
                  <a href="tel:+918080949300" tabIndex={mobileMenuOpen ? 0 : -1} className="text-xs text-slate-500 hover:text-blue-900">+91 80809 49300</a>
                  <Link href="#admissions" tabIndex={mobileMenuOpen ? 0 : -1} onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900">
                    Apply now <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div id="announcements" className="overflow-hidden border-b border-slate-200/70 bg-white/75 backdrop-blur-lg">
        <div className="ticker-track flex w-max items-center gap-4 py-3">
          {[...announcements, ...announcements].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-4 text-xs font-medium text-slate-700 sm:text-sm">
              {item}
              <Badge className="h-5 rounded-sm bg-red-600 px-2 text-[10px] text-white hover:bg-red-600">New</Badge>
              <span className="text-blue-900">|</span>
            </span>
          ))}
        </div>
      </div>

      <section id="home" aria-label="Featured stories" className="relative bg-[#0b2148]">
        <Carousel opts={{ loop: true }} setApi={handleHeroApi} className="group">
          <CarouselContent className="ml-0">
            {[
              { eyebrow: "Curiosity has a home", title: "Invest in knowledge.\nBuild what’s next.", copy: "A place to explore your ideas, find your people, and shape a future that matters.", label: "LEARN WITH PURPOSE" },
              { eyebrow: "A future in the making", title: "Big ideas start\nright here.", copy: "Find the confidence, community, and hands-on experience to take your next step.", label: "MAKE AN IMPACT" },
              { eyebrow: "Your next chapter", title: "A brighter future\nstarts with you.", copy: "Discover a campus where ambitious minds become thoughtful engineers and leaders.", label: "YOUR STORY STARTS HERE" },
            ].map((slide, index) => (
              <CarouselItem key={slide.label} className="basis-full pl-0">
                <div className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-[radial-gradient(ellipse_at_72%_38%,rgba(85,160,228,0.3),transparent_36%),linear-gradient(125deg,#07152f_0%,#102f63_52%,#174b7a_100%)] px-6 py-16 sm:min-h-[500px] sm:px-12 lg:min-h-[570px]">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="hero-orb absolute -right-32 -top-52 size-[34rem] rounded-full bg-sky-300/10 blur-3xl" />
                    <div className="absolute -right-32 -top-56 size-[34rem] rounded-full border border-white/10" />
                    <div className="absolute -right-16 -top-40 size-[26rem] rounded-full border border-white/10" />
                    <div className="absolute right-8 top-[-7rem] size-[18rem] rounded-full border border-white/10" />
                    <div className="absolute bottom-[-18rem] left-[48%] size-[35rem] rounded-full border border-white/[0.08]" />
                    <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(90deg,transparent,black)]" />
                  </div>
                  <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                    <div className="max-w-2xl">
                      <Badge variant="outline" className="glass-panel-dark mb-7 h-auto gap-2 rounded-full px-4 py-2 text-[10px] tracking-[0.2em] text-blue-50">
                        <Sparkles className="size-3.5" /> {slide.eyebrow}
                      </Badge>
                      <h2 className="whitespace-pre-line text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">{slide.title}</h2>
                      <p className="mt-6 max-w-lg text-sm leading-7 text-blue-100/80 sm:text-base">{slide.copy}</p>
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link href="#courses" className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#102f63] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50">
                          Explore our programs <ArrowRight className="size-4" />
                        </Link>
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-100/70">{slide.label}</span>
                      </div>
                    </div>
                    <div className="hidden min-h-64 items-center justify-center lg:flex">
                      <div className="glass-panel-dark relative flex size-64 items-center justify-center rounded-full shadow-[0_0_100px_rgba(105,174,230,0.14)]">
                        <div className="absolute inset-5 rounded-full border border-dashed border-white/20" />
                        <div className="absolute inset-12 rounded-full border border-white/15" />
                        <div className="glass-panel-dark flex size-28 items-center justify-center rounded-[2rem] text-white shadow-2xl">
                          <GraduationCap className="size-14" strokeWidth={1.2} />
                        </div>
                        <span className="glass-panel-dark absolute -right-2 top-10 rounded-full px-4 py-2 text-[10px] font-semibold tracking-wider text-blue-100">CREATE</span>
                        <span className="glass-panel-dark absolute -bottom-1 left-0 rounded-full px-4 py-2 text-[10px] font-semibold tracking-wider text-blue-100">DISCOVER</span>
                        <span className="glass-panel-dark absolute -left-7 top-1/2 rounded-full px-4 py-2 text-[10px] font-semibold tracking-wider text-blue-100">GROW</span>
                      </div>
                    </div>
                  </div>
                  <span className="absolute bottom-7 right-8 font-mono text-xs tracking-widest text-white/60 sm:right-12">{String(index + 1).padStart(2, "0")} <span className="text-white/30">/ 03</span></span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Previous featured story" className="left-4 top-1/2 z-10 size-11 -translate-y-1/2 border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100 hover:bg-white/20 sm:left-8" />
          <CarouselNext aria-label="Next featured story" className="right-4 top-1/2 z-10 size-11 -translate-y-1/2 border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100 hover:bg-white/20 sm:right-8" />
        </Carousel>
        <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to featured story ${index + 1}`}
              aria-current={activeHeroSlide === index ? "true" : undefined}
              onClick={() => heroApi.current?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all ${activeHeroSlide === index ? "w-8 bg-white" : "w-1.5 bg-white/45 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </section>

      <section id="why-sigce" className="scroll-mt-24 bg-white px-5 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.55fr_0.8fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-800">Why SIGCE</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">More than a degree.<br /><span className="text-blue-800">A place to become.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">At SIGCE, learning doesn’t stop at the classroom door. We bring people, possibility, and practical experience together so students can make their mark.</p>
            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {benefits.map(([title, detail], index) => (
                <div key={title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-900">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="#courses" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-blue-900 transition hover:gap-3">
              Discover the SIGCE difference <ArrowRight className="size-4" />
            </Link>
          </div>
          <Card className="glass-panel h-fit overflow-hidden rounded-2xl py-0">
            <CardHeader className="border-b border-white/15 bg-[#102f63]/90 px-6 py-5 text-white backdrop-blur-xl">
              <CardTitle className="text-lg font-semibold">Latest announcements</CardTitle>
              <CardDescription className="text-xs text-blue-100/75">A few things happening at SIGCE</CardDescription>
            </CardHeader>
            <CardContent className="px-6 py-2">
              {announcements.map((announcement, index) => (
                <div key={announcement}>
                  <Link href="#admissions" className="group flex gap-4 py-4">
                    <span className="mt-0.5 font-mono text-[10px] text-slate-400">0{index + 1}</span>
                    <span className="flex-1 text-sm leading-5 text-slate-700 transition group-hover:text-blue-900">{announcement}</span>
                    {index === 0 && <Badge className="bg-red-600 text-[9px] text-white hover:bg-red-600">New</Badge>}
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-slate-400 transition group-hover:text-blue-800" />
                  </Link>
                  {index < announcements.length - 1 && <Separator />}
                </div>
              ))}
              <Link href="#admissions" className="mb-5 mt-2 inline-flex items-center gap-2 text-xs font-semibold text-blue-900">All notices <ArrowRight className="size-3.5" /></Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="courses" className="scroll-mt-24 bg-[#f7f8fb] px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Find your direction" title="A course for your curiosity" description="Explore programs built for the questions you want to answer and the future you want to shape." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => {
              const Icon = course.icon
              return (
                <Card key={course.title} className="glass-panel group min-h-48 rounded-2xl text-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col justify-between p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 transition group-hover:bg-[#102f63] group-hover:text-white"><Icon className="size-6" strokeWidth={1.7} /></span>
                      <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                    </div>
                    <div className="mt-7">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-blue-800">{course.note}</p>
                      <h3 className="text-base font-semibold leading-snug">{course.title}</h3>
                      <p className="mt-2 text-xs text-slate-500">Department head · {course.lead}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="mt-9 text-center">
            <Link href="#admissions" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#102f63] hover:bg-[#102f63] hover:text-white">View all programs <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="A record of possibility" title="Small steps. Big futures." description="For more than two decades, SIGCE has helped determined students turn their ambitions into action." />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`flex items-center gap-4 px-4 ${index > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}`}>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#102f63]"><Icon className="size-6" strokeWidth={1.7} /></span>
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">{stat.number}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="admissions" className="scroll-mt-24 relative overflow-hidden bg-[#091a39] px-5 py-20 text-center sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(52,113,177,.55),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl">
          <Badge variant="outline" className="glass-panel-dark mb-6 rounded-full px-4 py-1.5 text-blue-100">YOUR NEXT CHAPTER</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Your future is full of possibility.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100/75 sm:text-base">Join a community of people who are ready to learn, question, build, and make a difference.</p>
          <Link href="mailto:contactus@sigce.edu.in" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#102f63] transition hover:-translate-y-0.5 hover:bg-blue-50">Start your application <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <section id="events" className="scroll-mt-24 bg-[#f7f8fb] px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Happening here" title="Meet us in the moment" description="From a first spark to a shared celebration, there’s always something happening on campus." />
          <Carousel opts={{ align: "start" }} className="group mx-2 sm:mx-8">
            <CarouselContent className="-ml-4 pb-4">
              {events.map((event) => (
                <CarouselItem key={event.title} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                  <Card className="glass-panel h-full overflow-hidden rounded-2xl py-0 transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex h-36 items-end justify-between bg-gradient-to-br from-[#102f63] via-blue-800 to-sky-500 p-5 text-white">
                      <div className="flex size-14 flex-col items-center justify-center rounded-xl bg-white text-[#102f63] shadow-lg">
                        <span className="text-xl font-bold leading-none">{event.day}</span>
                        <span className="mt-1 text-[9px] font-bold tracking-widest">{event.month}</span>
                      </div>
                      <Badge variant="outline" className="rounded-full border-white/30 bg-white/10 text-white">{event.category}</Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold leading-snug text-slate-900">{event.title}</h3>
                      <p className="mt-2 text-xs text-slate-500">{event.detail}</p>
                      <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400"><CalendarDays className="size-3.5" /> SIGCE campus <span className="ml-auto"><ArrowUpRight className="size-4" /></span></div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Previous events" className="-left-5 border-slate-200 bg-white text-[#102f63] opacity-0 shadow-sm group-hover:opacity-100 sm:-left-10" />
            <CarouselNext aria-label="Next events" className="-right-5 border-slate-200 bg-white text-[#102f63] opacity-0 shadow-sm group-hover:opacity-100 sm:-right-10" />
          </Carousel>
          <div className="mt-8 text-center">
            <Link href="#gallery" className="inline-flex items-center gap-2 border-b border-blue-900 pb-1 text-sm font-semibold text-blue-900">Explore campus life <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="The people who make it" title="A few words from our students" description="The best part of SIGCE is what we build together: confidence, friendships, and a way forward." />
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { quote: "Success isn’t a solo journey. The guidance and encouragement I found at SIGCE helped me see just how much I could do.", name: "Hrishikesh", course: "Computer Engineering, Student", initials: "HR" },
              { quote: "I came here ready to learn. I found a community that challenged me to think bigger, work harder, and trust my own ideas.", name: "Dakshata", course: "Information Technology, Student", initials: "DK" },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="glass-panel rounded-2xl text-slate-900">
                <CardContent className="p-6 sm:p-8">
                  <span aria-hidden="true" className="font-serif text-5xl leading-none text-blue-200">“</span>
                  <p className="-mt-2 max-w-xl text-base leading-7 text-slate-700">{testimonial.quote}</p>
                  <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <Avatar className="size-11 bg-blue-50 text-blue-900"><AvatarFallback className="bg-blue-50 font-semibold text-blue-900">{testimonial.initials}</AvatarFallback></Avatar>
                    <div><p className="text-sm font-semibold">{testimonial.name}</p><p className="mt-0.5 text-xs text-slate-500">{testimonial.course}</p></div>
                    <div className="ml-auto flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">★★★★★</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-24 bg-white px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Life at SIGCE" title="A campus of possibilities" description="The best memories aren’t posed. They happen when curious people come together." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryTiles.map((tile) => (
              <div key={tile.number} className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
                <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${tile.color} transition duration-500 group-hover:scale-105`} />
                <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="glass-panel-dark relative z-10 flex min-w-0 items-center gap-3 rounded-full px-3 py-2">
                  <span className="shrink-0 font-mono text-[10px] text-white/70">{tile.number}</span>
                  <p className="truncate text-xs font-semibold">{tile.label}</p>
                </div>
                <span className="glass-panel-dark relative z-10 ml-auto flex size-9 shrink-0 items-center justify-center rounded-full text-white/80 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center gap-2" aria-label="Gallery pagination">
            <span className="size-2 rounded-full bg-blue-900" /><span className="size-2 rounded-full bg-slate-200" />
          </div>
        </div>
      </section>

      <section aria-label="Find us" className="bg-white px-5 pb-20">
        <div className="relative mx-auto flex min-h-80 max-w-7xl items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[#f1f5f9]">
          <div aria-hidden="true" className="absolute inset-0 opacity-80 [background-image:linear-gradient(35deg,transparent_48%,#cbd5e1_49%,#cbd5e1_50%,transparent_51%),linear-gradient(145deg,transparent_47%,#cbd5e1_48%,#cbd5e1_50%,transparent_51%),linear-gradient(90deg,transparent_49%,#dbe3eb_50%,transparent_51%),linear-gradient(0deg,transparent_49%,#dbe3eb_50%,transparent_51%)] [background-size:130px_100px,170px_130px,110px_80px,140px_90px]" />
          <div aria-hidden="true" className="absolute inset-y-0 left-[22%] w-12 -skew-x-12 bg-emerald-100/70" />
          <div aria-hidden="true" className="absolute inset-y-0 right-[19%] w-9 skew-x-12 bg-emerald-100/70" />
          <Card className="glass-panel relative z-10 max-w-sm rounded-2xl">
            <CardContent className="flex items-start gap-4 p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600"><MapPin className="size-6" /></span>
              <div><CardTitle className="text-sm font-semibold">Smt. Indira Gandhi College of Engineering</CardTitle><CardDescription className="mt-2 leading-5">Plot No. 1, Sector 8, Ghansoli,<br />Navi Mumbai 400701</CardDescription>
                <a className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-900" href="https://maps.google.com/?q=Smt.+Indira+Gandhi+College+of+Engineering+Ghansoli" target="_blank" rel="noreferrer">Get directions <ArrowUpRight className="size-3.5" /></a>
              </div>
            </CardContent>
          </Card>
          <span className="absolute bottom-4 right-5 z-10 rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium text-slate-500">GHANSOLI · NAVI MUMBAI</span>
        </div>
      </section>

      <footer className="relative isolate overflow-hidden bg-[#07152f] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div aria-hidden="true" className="hero-orb pointer-events-none absolute -right-40 -top-56 size-[34rem] rounded-full bg-blue-400/20 blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-36 size-[30rem] rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-12 sm:px-7 sm:pt-16">
          <div className="glass-panel-dark mb-14 flex flex-col gap-7 rounded-[1.75rem] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200">
                <Sparkles className="size-3.5" /> The next chapter is yours
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Bring your curiosity.<br className="hidden sm:block" /> We&apos;ll make room for it.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/65">Start a conversation with our admissions team and discover where your ideas can take you.</p>
            </div>
            <Link href="mailto:contactus@sigce.edu.in" className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102f63] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50 sm:self-center">
              Talk to admissions <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_0.7fr_1.15fr] lg:gap-12">
            <div>
              <div className="glass-panel-dark flex size-14 items-center justify-center rounded-2xl text-white">
                <GraduationCap className="size-8" strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">SIGCE · Navi Mumbai</p>
              <h3 className="mt-2 max-w-xs text-lg font-semibold leading-snug tracking-tight text-white">Smt. Indira Gandhi College of Engineering</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-blue-100/60">An autonomous institute affiliated to the University of Mumbai.</p>
              <Link href="#home" className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-blue-100/80 transition hover:text-white">
                A place to become <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">Find us</p>
              <h3 className="mt-2 text-sm font-semibold text-white">Come say hello</h3>
              <ul className="mt-5 space-y-4 text-sm text-blue-100/65">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-blue-200" />
                  <span>Plot No. 1, Sector 8, Ghansoli,<br />Navi Mumbai 400701</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-blue-200" />
                  <a href="tel:+918080949300" className="transition hover:text-white">+91 80809 49300</a>
                </li>
                <li className="flex items-center gap-3">
                  <Send className="size-4 shrink-0 text-blue-200" />
                  <a href="mailto:contactus@sigce.edu.in" className="transition hover:text-white">contactus@sigce.edu.in</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">Explore</p>
              <h3 className="mt-2 text-sm font-semibold text-white">Find your way</h3>
              <nav aria-label="Footer navigation" className="mt-5 flex flex-col items-start gap-3 text-sm text-blue-100/65">
                <Link href="#courses" className="transition hover:translate-x-1 hover:text-white">Programs</Link>
                <Link href="#events" className="transition hover:translate-x-1 hover:text-white">Campus life</Link>
                <Link href="#gallery" className="transition hover:translate-x-1 hover:text-white">Our community</Link>
                <Link href="#admissions" className="transition hover:translate-x-1 hover:text-white">Admissions</Link>
              </nav>
            </div>

            <div className="glass-panel-dark rounded-2xl p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">Occasional notes</p>
              <h3 className="mt-2 text-lg font-semibold text-white">A little good news.</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100/60">Admissions, campus events, and the ideas our students are bringing to life.</p>
              <form className="mt-5 flex gap-2" onSubmit={handleSubscribe}>
                <Input aria-label="Your email address" className="h-11 min-w-0 rounded-xl border-white/15 bg-white/10 text-white placeholder:text-blue-100/45 focus-visible:ring-blue-200/40" type="email" placeholder="Your email address" required />
                <Button render={<button />} aria-label="Subscribe to newsletter" className="h-11 shrink-0 rounded-xl bg-white px-4 text-[#102f63] hover:bg-blue-50" type="submit">
                  {subscribed ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
                </Button>
              </form>
              <p aria-live="polite" className="mt-2 min-h-4 text-xs text-blue-200">{subscribed ? "You’re on the list. Thanks for subscribing!" : "No noise. Just the good stuff."}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-blue-100/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 SIGCE. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" /> Made for what comes next</span>
              <a href="#home" aria-label="Back to top" className="inline-flex items-center gap-1.5 text-blue-100/75 transition hover:text-white">
                Back to top <ArrowDown className="size-3 rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
    {showLoader && (
      <div
        className={`site-loader ${loaderLeaving ? "site-loader-leaving" : ""}`}
        role="status"
        aria-live="polite"
        aria-label="Loading SIGCE"
      >
        <div aria-hidden="true" className="loader-grid" />
        <div aria-hidden="true" className="loader-glow loader-glow-one" />
        <div aria-hidden="true" className="loader-glow loader-glow-two" />
        <div className="loader-content">
          <div aria-hidden="true" className="loader-stage">
            <div className="loader-orbit loader-orbit-outer"><span /></div>
            <div className="loader-orbit loader-orbit-inner"><span /></div>
            <div className="loader-orbit loader-orbit-tilt"><span /></div>
            <span className="loader-particle loader-particle-one" />
            <span className="loader-particle loader-particle-two" />
            <span className="loader-particle loader-particle-three" />
            <div className="loader-core">
              <GraduationCap className="loader-glyph" strokeWidth={1.4} />
            </div>
          </div>
          <p className="loader-kicker">Smt. Indira Gandhi</p>
          <p className="loader-title">College of Engineering</p>
          <div aria-hidden="true" className="loader-progress"><span /></div>
          <p className="loader-status">Opening new possibilities<span className="loader-ellipsis">...</span></p>
        </div>
      </div>
    )}
    </>
  )
}

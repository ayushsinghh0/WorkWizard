import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Search, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-background to-purple-50 dark:from-violet-950/30 dark:via-background dark:to-purple-950/20 min-h-[90vh] flex items-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-400/20 dark:bg-violet-600/15 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-300/10 dark:bg-fuchsia-500/8 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, oklch(0.55 0.22 290) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </div>

      <div className="container mx-auto px-5 py-20 md:py-28 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-14 md:gap-20">

          {/* Left Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-7">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 backdrop-blur-sm shadow-sm">
              <TrendingUp size={15} className="text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">#1 Job Platform in India</span>
              <Sparkles size={13} className="text-violet-500" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Find Your{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Dream Job
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-70" />
              </span>
              {" "}at{" "}
              <span className="inline-block">
                Work
                <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent"> Wizard</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-xl">
              Connect with top employers and discover opportunities that match your skills. Whether you're a job seeker or recruiter, we've got powerful tools and a seamless experience.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 py-2">
              {[
                { value: "10k+", label: "Active Jobs", icon: Briefcase },
                { value: "5k+", label: "Companies", icon: Zap },
                { value: "50k+", label: "Job Seekers", icon: Users },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-800/50 backdrop-blur-sm shadow-sm">
                  <Icon size={18} className="text-violet-600 dark:text-violet-400" />
                  <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent leading-none">{value}</p>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="text-base px-8 h-12 gap-2 group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 border-0"
                >
                  <Search size={18} />
                  Browse Jobs
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 h-12 gap-2 border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:border-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-all duration-300"
                >
                  <Briefcase size={18} />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
              {["Free to use", "Verified employers", "Secure platform"].map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <span className="opacity-30">•</span>}
                  <span className="flex items-center gap-1.5">
                    <span className="text-violet-500">✓</span> {item}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right – Decorative Card Stack */}
          <div className="flex-1 w-full max-w-md mx-auto md:max-w-none">
            <div className="relative group">
              {/* Glowing backdrop */}
              <div className="absolute -inset-6 bg-gradient-to-r from-violet-500 to-purple-600 opacity-20 blur-2xl rounded-3xl group-hover:opacity-30 transition-opacity duration-500" />

              {/* Main card */}
              <div className="relative rounded-2xl border border-violet-200 dark:border-violet-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 shadow-2xl violet-glow">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-base">AI-Powered Matching</p>
                      <p className="text-xs text-muted-foreground">Find the perfect role</p>
                    </div>
                  </div>

                  {[
                    { role: "Senior Frontend Developer", company: "TechCorp India", salary: "₹18-25 LPA", match: "98%" },
                    { role: "Product Manager", company: "StartupXYZ", salary: "₹22-35 LPA", match: "94%" },
                    { role: "Full Stack Engineer", company: "GlobalSoft", salary: "₹15-22 LPA", match: "91%" },
                  ].map((job) => (
                    <div key={job.role} className="flex items-center justify-between p-3.5 rounded-xl bg-violet-50/60 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-800/50 hover:border-violet-300 dark:hover:border-violet-600 transition-colors cursor-pointer group/card">
                      <div>
                        <p className="font-semibold text-sm">{job.role}</p>
                        <p className="text-xs text-muted-foreground">{job.company} · {job.salary}</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-sm">
                        {job.match}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-bounce">
                🔥 Hot Picks
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
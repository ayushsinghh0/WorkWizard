"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code2,
  Github,
  Globe,
  Layers,
  Linkedin,
  Rocket,
  Server,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

/* ─── tiny hook: triggers once when element enters viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── floating particle ─── */
const Particle = ({
  style,
  delay,
}: {
  style?: React.CSSProperties;
  delay?: string;
}) => (
  <div
    className="absolute w-1.5 h-1.5 rounded-full bg-white/20"
    style={{
      animation: `floatUp 6s ease-in-out infinite`,
      animationDelay: delay ?? "0s",
      ...style,
    }}
  />
);

interface TechItem {
  label: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  text: string;
}

const techStack: TechItem[] = [
  { label: "Next.js", icon: Globe, color: "from-gray-700 to-gray-900", gradient: "from-gray-700 to-gray-900", text: "text-white" },
  { label: "TypeScript", icon: Code2, color: "from-blue-500 to-blue-700", gradient: "from-blue-500 to-blue-700", text: "text-white" },
  { label: "Node.js", icon: Server, color: "from-green-500 to-emerald-700", gradient: "from-green-500 to-emerald-700", text: "text-white" },
  { label: "PostgreSQL", icon: Layers, color: "from-sky-500 to-sky-700", gradient: "from-sky-500 to-sky-700", text: "text-white" },
  { label: "Tailwind CSS", icon: Sparkles, color: "from-teal-400 to-cyan-600", gradient: "from-teal-400 to-cyan-600", text: "text-white" },
  { label: "Microservices", icon: Zap, color: "from-violet-500 to-purple-700", gradient: "from-violet-500 to-purple-700", text: "text-white" },
];

const features = [
  {
    icon: Rocket,
    title: "Built from Scratch",
    desc: "Every line of code written personally — no templates, no shortcuts.",
    gradient: "from-orange-500 to-rose-500",
  },
  {
    icon: Layers,
    title: "Microservice Architecture",
    desc: "Auth, Job & User services separated cleanly with an API gateway.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Trophy,
    title: "Full-Stack",
    desc: "React frontend, Node.js backend, PostgreSQL DB — end to end.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Star,
    title: "Production Ready",
    desc: "JWT auth, file uploads, real-time toasts, dark mode & more.",
    gradient: "from-violet-500 to-purple-600",
  },
];

const About = () => {
  const hero = useInView(0.1);
  const cards = useInView(0.1);
  const tech = useInView(0.1);
  const dev = useInView(0.1);
  const cta = useInView(0.1);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* inject keyframes */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1);   opacity: 0.6; }
          50%  { transform: translateY(-30px) scale(1.3); opacity: 1;   }
          100% { transform: translateY(0px) scale(1);   opacity: 0.6; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.8); }
          70%  { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1);   }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center;  }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(99,102,241,.5); }
          70%  { box-shadow: 0 0 0 18px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0);   }
        }
        .anim-fade-up  { animation: fadeSlideUp   0.7s ease both; }
        .anim-fade-left { animation: fadeSlideLeft 0.7s ease both; }
        .anim-fade-right{ animation: fadeSlideRight 0.7s ease both; }
        .anim-pop      { animation: popIn          0.6s ease both; }
        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #a78bfa);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* ═══════════════════════  HERO  ═══════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-violet-900 to-blue-950" />
        {/* mesh overlay */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(139,92,246,.6) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59,130,246,.5) 0%, transparent 50%)",
          }}
        />
        {/* grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* floating particles */}
        <Particle style={{ left: "10%", top: "25%" }} delay="0s" />
        <Particle style={{ left: "25%", top: "65%" }} delay="1.5s" />
        <Particle style={{ left: "55%", top: "20%" }} delay="0.8s" />
        <Particle style={{ left: "70%", top: "55%" }} delay="2.2s" />
        <Particle style={{ left: "85%", top: "30%" }} delay="0.4s" />
        <Particle style={{ left: "90%", top: "75%" }} delay="3s" />
        <Particle style={{ left: "40%", top: "80%" }} delay="1s" />

        <div
          ref={hero.ref}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          {/* badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-8 ${hero.visible ? "anim-pop" : "opacity-0"
              }`}
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles size={14} className="text-yellow-400" />
            Crafted with passion by a full-stack developer
          </div>

          {/* headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight ${hero.visible ? "anim-fade-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.2s" }}
          >
            Welcome to{" "}
            <span className="shimmer-text">Work Wizard</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed ${hero.visible ? "anim-fade-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.35s" }}
          >
            A full-featured job portal built entirely from scratch — connecting
            talented job seekers with exceptional companies through smart
            technology.
          </p>

          <div
            className={`flex items-center justify-center gap-4 flex-wrap ${hero.visible ? "anim-fade-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/jobs">
              <Button
                size="lg"
                className="gap-2 h-12 px-8 text-base bg-white text-indigo-700 hover:bg-white/90 font-bold rounded-xl shadow-xl shadow-black/20 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <Rocket size={18} />
                Explore Jobs
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="ghost"
                className="gap-2 h-12 px-8 text-base text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          {/* scroll hint */}
          <div
            className={`mt-16 flex flex-col items-center gap-2 text-white/30 text-xs ${hero.visible ? "anim-fade-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.7s" }}
          >
            <span>Scroll to explore</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════════  FEATURE CARDS  ═══════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div
            ref={cards.ref}
            className={`text-center mb-14 ${cards.visible ? "anim-fade-up" : "opacity-0"
              }`}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              What Makes It Special
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
              Every feature thoughtfully designed, every component hand-coded.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`group relative p-6 rounded-2xl border border-border/50 bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${cards.visible ? "anim-fade-up" : "opacity-0"
                  }`}
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                {/* glow on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${f.gradient}`}
                />
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} mb-4 shadow-lg`}
                >
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  TECH STACK  ═══════════════════ */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div
            ref={tech.ref}
            className={`text-center mb-12 ${tech.visible ? "anim-fade-up" : "opacity-0"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Built With
            </h2>
            <p className="text-muted-foreground">
              A modern, production-grade technology stack
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {techStack.map((t, i) => (
              <div
                key={t.label}
                className={`group flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br ${t.gradient} shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${tech.visible ? "anim-pop" : "opacity-0"
                  }`}
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <t.icon size={26} className={t.text} />
                <span className={`text-xs font-bold ${t.text} text-center`}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  DEVELOPER CARD  ═══════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div
              ref={dev.ref}
              className={`text-center mb-12 ${dev.visible ? "anim-fade-up" : "opacity-0"
                }`}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Meet the{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Developer
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Made with ❤️ and late nights — 100% solo-built
              </p>
            </div>

            {/* Card */}
            <div
              className={`relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl ${dev.visible ? "anim-fade-up" : "opacity-0"
                }`}
              style={{ animationDelay: "0.2s" }}
            >
              {/* top gradient strip */}
              <div className="h-36 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 70% 50%, rgba(255,255,255,.4) 0%, transparent 60%)",
                  }}
                />
              </div>

              <div className="bg-card px-6 sm:px-10 pb-10">
                {/* avatar */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 -mt-14 mb-8">
                  <div
                    className="w-24 h-24 rounded-2xl border-4 border-background bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl"
                    style={{ animation: "pulse-ring 3s ease infinite" }}
                  >
                    <span className="text-3xl font-black text-white">A</span>
                  </div>

                  {/* social links */}
                  <div
                    className={`flex items-center gap-3 flex-wrap ${dev.visible ? "anim-fade-left" : "opacity-0"
                      }`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    <a
                      href="https://www.linkedin.com/in/ayush-raj-386886249/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077B5]/10 hover:bg-[#0077B5] border border-[#0077B5]/30 text-[#0077B5] hover:text-white transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/ayushsinghh0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/10 dark:bg-white/10 hover:bg-gray-900 dark:hover:bg-white border border-gray-900/30 dark:border-white/30 text-gray-900 dark:text-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                    <a
                      href="https://leetcode.com/u/ayushraj4820/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFA116]/10 hover:bg-[#FFA116] border border-[#FFA116]/30 text-[#FFA116] hover:text-white transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-lg hover:shadow-[#FFA116]/30 hover:-translate-y-0.5"
                    >
                      <Code2 size={16} />
                      LeetCode
                    </a>
                  </div>
                </div>

                {/* name + bio */}
                <div
                  className={`${dev.visible ? "anim-fade-right" : "opacity-0"}`}
                  style={{ animationDelay: "0.3s" }}
                >
                  <h3 className="text-2xl sm:text-3xl font-black mb-1 tracking-tight">
                    Ayush Raj
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4 text-sm">
                    Full-Stack Developer · India
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl text-[15px]">
                    Hi! I&#39;m Ayush — a passionate full-stack developer who built{" "}
                    <span className="font-semibold text-foreground">
                      Work Wizard
                    </span>{" "}
                    entirely from scratch. From designing the microservice
                    architecture to crafting every UI component, every single
                    line was written by me. This project demonstrates my skills in
                    building production-ready, scalable web applications.
                  </p>
                </div>

                {/* stats */}
                <div
                  className={`grid grid-cols-3 gap-4 mt-8 ${dev.visible ? "anim-fade-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: "0.5s" }}
                >
                  {[
                    { value: "100%", label: "Solo Built" },
                    { value: "6+", label: "Services" },
                    { value: "∞", label: "Passion" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/60 border border-border/40"
                    >
                      <p className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        {s.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium mt-1">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  CTA  ═══════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-700 to-blue-700" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(255,255,255,.3) 0%, transparent 60%)",
          }}
        />

        <div className="relative container mx-auto px-4">
          <div
            ref={cta.ref}
            className={`max-w-3xl mx-auto text-center ${cta.visible ? "anim-fade-up" : "opacity-0"
              }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8">
              <Star size={14} className="text-yellow-300" />
              Start your journey today
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to find your
              <br />
              <span className="text-yellow-300">dream job?</span>
            </h2>

            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of job seekers already using Work Wizard to land
              their perfect role.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="gap-2 h-13 px-10 text-base bg-white text-indigo-700 hover:bg-white/90 font-bold rounded-xl shadow-2xl shadow-black/20 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  Browse Jobs
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  className="gap-2 h-13 px-10 text-base bg-transparent text-white border-2 border-white/40 hover:bg-white/10 font-semibold rounded-xl transition-all duration-200 cursor-pointer"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

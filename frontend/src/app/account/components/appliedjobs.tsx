"use client";
import { Card } from "@/components/ui/card";
import { Application } from "@/type";
import { Briefcase, CheckCircle2, Clock, DollarSign, Eye, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AppliedJobsProps {
  applications: Application[];
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ applications }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "hired":
        return { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800" };
      case "rejected":
        return { icon: XCircle, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20", border: "border-rose-200 dark:border-rose-800" };
      default:
        return { icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800" };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="shadow-xl border border-violet-100 dark:border-violet-900/40 overflow-hidden rounded-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Applied Jobs</h1>
              <p className="text-sm text-white/80 mt-0.5">
                {applications.length ?? 0} application{applications.length !== 1 ? "s" : ""} submitted
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {applications && applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((a) => {
                const statusConfig = getStatusConfig(a.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <div
                    key={a.application_id}
                    className="p-5 rounded-xl border-2 border-violet-100 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20 transition-all bg-background"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-violet-600">{a.job_title}</h3>
                        <div className="flex flex-wrap gap-3 items-center">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-sm font-semibold">
                            <DollarSign size={13} />
                            ₹{a.job_salary} P.A
                          </div>
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusConfig.bg} ${statusConfig.border} text-sm font-semibold`}>
                            <StatusIcon size={13} className={statusConfig.color} />
                            <span className={statusConfig.color}>{a.status}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/jobs/${a.job_id}`}
                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg border border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:border-violet-400 font-semibold text-sm transition-colors"
                      >
                        <Eye size={15} /> View Job
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-4">
                <Briefcase size={28} className="text-violet-500 dark:text-violet-400 opacity-70" />
              </div>
              <p className="font-bold text-lg mb-1">No Applications Yet</p>
              <p className="text-sm text-muted-foreground">Jobs you apply to will appear here.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppliedJobs;

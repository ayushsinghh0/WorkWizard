"use client";
import { Job } from "@/type";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  DollarSign,
  MapPin,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAppData } from "@/context/appContext";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { user, btnLoading, applyJob, applications } = useAppData();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && job.job_id) {
      applications.forEach((item: { job_id: number }) => {
        if (item.job_id === job.job_id) setApplied(true);
      });
    }
  }, [applications, job.job_id]);

  return (
    <Card className="w-full max-w-[380px] relative group border border-violet-100 dark:border-violet-900/40 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-xl hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30 transition-all duration-300 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 size={15} />
              <span>{job.company_name}</span>
            </div>
          </div>

          <Link href={`/company/${job.company_id}`} className="shrink-0">
            <div className="w-12 h-12 rounded-xl border border-violet-100 dark:border-violet-800 bg-white dark:bg-zinc-800 p-1 flex items-center justify-center overflow-hidden hover:scale-110 hover:border-violet-400 transition-all duration-200 shadow-sm">
              <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-contain" />
            </div>
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              <MapPin size={13} />
              <span className="font-medium">{job.location}</span>
            </div>
            {job.job_type && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                <Briefcase size={13} />
                <span className="font-medium">{job.job_type}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-base font-bold text-emerald-700 dark:text-emerald-400">
            <DollarSign size={18} />
            <span>₹{job.salary} P.A</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 pt-4 border-t border-violet-50 dark:border-violet-900/30">
        <div className="flex w-full gap-2">
          <Link href={`/jobs/${job.job_id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full gap-2 group/btn border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 dark:hover:text-violet-300 hover:border-violet-400"
            >
              View Details
              <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {user && user.role === "jobseeker" && (
            <>
              {applied ? (
                <div className="flex-1 flex items-center justify-center gap-2 text-green-700 dark:text-green-400 font-semibold text-sm bg-green-50 dark:bg-green-900/30 rounded-md px-3 py-2 border border-green-200 dark:border-green-800">
                  <CheckCircle size={15} />
                  Applied
                </div>
              ) : (
                job.is_active !== false && (
                  <Button
                    disabled={btnLoading}
                    onClick={() => applyJob(job.job_id)}
                    className="flex-1 gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-sm shadow-violet-400/30"
                  >
                    <Zap size={15} />
                    Apply
                  </Button>
                )
              )}
            </>
          )}
        </div>

        {job.is_active === false && (
          <div className="w-full text-center text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/20 rounded-md px-3 py-2 font-semibold border border-rose-200 dark:border-rose-800">
            Position Closed
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;

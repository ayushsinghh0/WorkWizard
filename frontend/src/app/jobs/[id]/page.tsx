"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Application, Job } from "@/type";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Globe,
  Laptop,
  MapPin,
  Sparkles,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";
import { job_service, useAppData } from "@/context/appContext";
import { Loading } from "@/components/loading";

const JobPage = () => {
  const params = useParams();
  const id = params?.id as string;   
  const { user, applyJob, applications, btnLoading } = useAppData();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<Application[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");

  // Track status updates per application ID
  const [statusUpdates, setStatusUpdates] = useState<Record<number, string>>({});

  const token = Cookies.get("token");

  useEffect(() => {
    if (applications && id) {
      applications.forEach((item: { job_id: number }) => {
        if (item.job_id.toString() === id) setApplied(true);
      });
    }
  }, [applications, id]);

  const applyJobHandler = (jobId: number) => {
    applyJob(jobId);
  };

  async function fetchSingleJob() {
    try {
      const { data } = await axios.get(`${job_service}/api/job/${id}`);
      setJob(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchJobApplications() {
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobApplications(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && job && user.user_id === job.posted_by_recruiter_id) {
      fetchJobApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, job]);

  const updateApplicationHandler = async (applicationId: number) => {
    const selectedStatus = statusUpdates[applicationId];
    if (!selectedStatus) return toast.error("Please select a valid status");

    try {
      const { data } = await axios.put(
        `${job_service}/api/job/application/update/${applicationId}`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message || "Application updated");
      fetchJobApplications();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      } else {
        toast.error("Update failed");
      }
    }
  };

  const handleStatusSelect = (applicationId: number, value: string) => {
    setStatusUpdates((prev) => ({ ...prev, [applicationId]: value }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffMs = now.getTime() - posted.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const filteredApplications =
    filterStatus === "All"
      ? jobApplications
      : jobApplications.filter((app) => app.status === filterStatus);

  const statusCounts = {
    All: jobApplications.length,
    Submitted: jobApplications.filter((a) => a.status === "Submitted").length,
    Hired: jobApplications.filter((a) => a.status === "Hired").length,
    Rejected: jobApplications.filter((a) => a.status === "Rejected").length,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 px-4 sm:px-6">

      {job && (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
          
          {/* Top Navigation */}
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Header Card */}
             <Card className="p-6 sm:p-8 border shadow-md bg-white dark:bg-zinc-900 rounded-2xl">

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Logo */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl border bg-white flex items-center justify-center overflow-hidden shadow-sm">
                    {job.company_logo ? (
                      <img
                        src={job.company_logo}
                        alt={job.company_name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <Building2 size={36} className="text-muted-foreground/50" />
                    )}
                  </div>

                  {/* Title & Meta */}
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        job.is_active 
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" 
                          : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${job.is_active ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                        {job.is_active ? "Actively Hiring" : "Closed"}
                      </span>
                      
                      {job.created_at && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                          <Clock size={14} />
                          Posted {getTimeSince(job.created_at)}
                        </span>
                      )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">

                      {job.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-muted-foreground font-medium">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Building2 size={16} className="text-blue-500" />
                        {job.company_name}
                      </div>
                      {job.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                      )}
                      {job.role && (
                        <div className="flex items-center gap-1.5">
                          <User size={16} />
                          {job.role}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Job Description Card */}
              <Card className="p-6 sm:p-8 border shadow-md bg-white dark:bg-zinc-900 rounded-2xl">

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 items-center gap-2">
                  <FileText className="text-blue-500" size={22} />
                  Job Description
                </h2>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
              </Card>
            </div>

            {/* RIGHT COLUMN: Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Job Overview Card */}
              <Card className="p-6 border shadow-md bg-white dark:bg-zinc-900 rounded-2xl sticky top-6">

                <h3 className="text-lg font-bold text-foreground mb-6">Overview</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                      <DollarSign size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Salary</p>
                      <p className="font-bold text-foreground">{job.salary ? `₹${job.salary.toLocaleString("en-IN")} P.A` : "Not disclosed"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
                      <Briefcase size={20} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Job Type</p>
                      <p className="font-bold text-foreground">{job.job_type || "Full-time"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Laptop size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Work Mode</p>
                      <p className="font-bold text-foreground">{job.work_location || "On-site"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Users size={20} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Openings</p>
                      <p className="font-bold text-foreground">{job.openings} Position{job.openings !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                </div>

                {/* Apply Button Section (Only for Jobseekers) */}
              {applied ? (
  <Button
    variant="outline"
    className="w-full h-12 gap-2 
               bg-green-50 
               text-green-700 
               border-green-200 
               cursor-default"
  >
    <CheckCircle2 size={18} />
    Applied Successfully
  </Button>
) : (
  job.is_active && (
    <Button
      onClick={() => applyJobHandler(job.job_id)}
      disabled={btnLoading}
      className="w-full h-12 gap-2 text-base font-semibold 
                 bg-blue-600 text-white 
                 hover:bg-blue-700 
                 border border-blue-600"
    >
      <Sparkles size={18} />
      {btnLoading ? "Applying..." : "Apply Now"}
    </Button>
  )
)}

              </Card>

            </div>
          </div>
        </div>
      )}

      {/* RECRUITER APPLICATIONS PANEL */}
      {user && job && user.user_id === job.posted_by_recruiter_id && (
        <div className="max-w-6xl mx-auto mt-12 animate-in slide-in-from-bottom-4 duration-500">
          <Card className="border shadow-md bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden">

            <div className="p-6 sm:p-8 border-b bg-muted/30">
              <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <Users size={24} className="text-blue-500" />
                Applicant Tracking
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your {jobApplications.length} candidate{jobApplications.length !== 1 ? "s" : ""} here.
              </p>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                {(["All", "Submitted", "Hired", "Rejected"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                      filterStatus === status
                        ? "bg-foreground text-background border-foreground shadow-sm"
                        : "bg-background text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {status}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      filterStatus === status ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                    }`}>
                      {statusCounts[status]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Application List */}
            <div className="p-6 sm:p-8">
              {jobApplications && jobApplications.length > 0 ? (
                <div className="grid gap-4">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                      <div
                        className="p-4 sm:p-5 rounded-xl border bg-background hover:border-blue-300 dark:hover:border-blue-800 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        key={app.application_id}
                      >
                        {/* Candidate Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                            {app.applicant_email?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">
                              {app.applicant_email}
                            </p>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                <Calendar size={12} />
                                {app.applied_at ? formatDate(app.applied_at) : "Recently"}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                                  app.status === "Hired"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                    : app.status === "Rejected"
                                    ? "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                }`}
                              >
                                {app.status === "Hired" && <CheckCircle2 size={12} />}
                                {app.status === "Rejected" && <XCircle size={12} />}
                                {app.status === "Submitted" && <Clock size={12} />}
                                {app.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t lg:border-none pt-4 lg:pt-0">
                          <div className="flex items-center gap-2">
                            <Link target="_blank" href={app.resume} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-900">
                                <FileText size={16} /> Resume
                              </Button>
                            </Link>
                            <Link target="_blank" href={`/account/${app.applicant_id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full gap-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/20 border-violet-200 dark:border-violet-900">
                                <ExternalLink size={16} /> Profile
                              </Button>
                            </Link>
                          </div>

                          <div className="w-px h-8 bg-border hidden sm:block mx-2" />

                          <div className="flex items-center gap-2">
                            <select
                              value={statusUpdates[app.application_id] || ""}
                              onChange={(e) => handleStatusSelect(app.application_id, e.target.value)}
                              className="flex-1 sm:w-[130px] h-9 px-3 text-sm font-medium border rounded-md bg-background focus:ring-2 focus:ring-foreground transition-all cursor-pointer"
                            >
                              <option value="" disabled>Status...</option>
                              <option value="Submitted">Submitted</option>
                              <option value="Hired">Hired</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                            <Button
                              disabled={btnLoading || !statusUpdates[app.application_id]}
                              onClick={() => updateApplicationHandler(app.application_id)}
                              size="sm"
                              className="h-9 px-4 shrink-0"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 border border-dashed rounded-xl">
                      <p className="text-foreground font-semibold">No {filterStatus} applications</p>
                      <p className="text-sm text-muted-foreground mt-1">Try changing your filter criteria.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed rounded-xl bg-muted/10">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Users size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1">No applications yet</h3>
                  <p className="text-sm text-muted-foreground">Applications will appear here once candidates start applying.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JobPage;
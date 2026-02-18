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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";
import { job_service, useAppData } from "@/context/appContext";
import { Loading } from "@/components/loading";

const JobPage = () => {
  const { id } = useParams();
  const { user, isAuth, applyJob, applications, btnLoading } = useAppData();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && id) {
      applications.forEach((item: { job_id: number }) => {
        if (item.job_id.toString() === id) setApplied(true);
      });
    }
  }, [applications, id]);

  const applyJobHandler = (id: number) => {
    applyJob(id);
  };

  const [loading, setLoading] = useState(true);

  async function fetchSingleJob() {
    try {
      const { data } = await axios.get(`${job_service}/api/job/${id}`);
      setJob(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleJob();
  }, [id]);

  const [jobApplications, setJobApplications] = useState<Application[]>([]);

  const token = Cookies.get("token");

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
  }, [user, job]);

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredApplications =
    filterStatus === "All"
      ? jobApplications
      : jobApplications.filter((app) => app.status === filterStatus);

  const [value, setValue] = useState("");

  const updateApplicationHandler = async (id: number) => {
    if (value === "") return toast.error("Please give valid value");

    try {
      const { data } = await axios.put(
        `${job_service}/api/job/application/update/${id}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      fetchJobApplications();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      } else {
        toast.error("Update failed");
      }
    }
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

  const statusCounts = {
    All: jobApplications.length,
    Submitted: jobApplications.filter((a) => a.status === "Submitted").length,
    Hired: jobApplications.filter((a) => a.status === "Hired").length,
    Rejected: jobApplications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {loading ? (
        <Loading />
      ) : (
        <>
          {job && (
            <div className="animate-in fade-in duration-500">
              {/* Hero Header */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/80 dark:from-gray-950/80 to-transparent" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16">
                  {/* Back button */}
                  <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors duration-200 text-sm font-medium"
                  >
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform duration-200"
                    />
                    Back to jobs
                  </button>

                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div className="flex items-start gap-5 flex-1 min-w-0">
                      {/* Company Logo */}
                      {job.company_logo ? (
                        <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden flex items-center justify-center shadow-lg">
                          <img
                            src={job.company_logo}
                            alt={job.company_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
                          <Building2 size={32} className="text-white/60" />
                        </div>
                      )}

                      <div className="min-w-0">
                        {/* Status badge + posted date */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${job.is_active
                                ? "bg-emerald-400/20 text-emerald-200 border border-emerald-400/30"
                                : "bg-red-400/20 text-red-200 border border-red-400/30"
                              }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${job.is_active
                                  ? "bg-emerald-400 animate-pulse"
                                  : "bg-red-400"
                                }`}
                            />
                            {job.is_active ? "Actively Hiring" : "Closed"}
                          </span>
                          {job.created_at && (
                            <span className="text-white/50 text-xs flex items-center gap-1">
                              <Clock size={12} />
                              Posted {getTimeSince(job.created_at)}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                          {job.title}
                        </h1>

                        {/* Company & Location */}
                        <div className="flex items-center gap-4 flex-wrap text-white/80">
                          <span className="flex items-center gap-1.5 text-sm font-medium">
                            <Building2 size={15} />
                            {job.company_name}
                          </span>
                          {job.location && (
                            <span className="flex items-center gap-1.5 text-sm">
                              <MapPin size={15} />
                              {job.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    {user && user.role === "jobseeker" && (
                      <div className="shrink-0">
                        {applied ? (
                          <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-200 font-medium text-sm shadow-lg">
                            <CheckCircle2 size={18} />
                            Applied
                          </div>
                        ) : (
                          <>
                            {job.is_active && (
                              <Button
                                onClick={() => applyJobHandler(job.job_id)}
                                disabled={btnLoading}
                                className="gap-2 h-12 px-8 bg-white text-indigo-700 hover:bg-white/90 font-semibold shadow-xl shadow-black/10 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                              >
                                <Sparkles size={18} />
                                {btnLoading ? "Applying..." : "Easy Apply"}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 pb-12">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
                  {[
                    {
                      icon: DollarSign,
                      label: "Salary",
                      value: job.salary
                        ? `₹${job.salary.toLocaleString("en-IN")} P.A`
                        : "Not disclosed",
                      color: "text-emerald-600 dark:text-emerald-400",
                      bg: "bg-emerald-50 dark:bg-emerald-900/20",
                      borderColor:
                        "border-emerald-200/60 dark:border-emerald-800/40",
                    },
                    {
                      icon: Briefcase,
                      label: "Job Type",
                      value: job.job_type || "Full-time",
                      color: "text-blue-600 dark:text-blue-400",
                      bg: "bg-blue-50 dark:bg-blue-900/20",
                      borderColor:
                        "border-blue-200/60 dark:border-blue-800/40",
                    },
                    {
                      icon: Laptop,
                      label: "Work Mode",
                      value: job.work_location || "On-site",
                      color: "text-violet-600 dark:text-violet-400",
                      bg: "bg-violet-50 dark:bg-violet-900/20",
                      borderColor:
                        "border-violet-200/60 dark:border-violet-800/40",
                    },
                    {
                      icon: Users,
                      label: "Openings",
                      value: `${job.openings} position${job.openings !== 1 ? "s" : ""
                        }`,
                      color: "text-amber-600 dark:text-amber-400",
                      bg: "bg-amber-50 dark:bg-amber-900/20",
                      borderColor:
                        "border-amber-200/60 dark:border-amber-800/40",
                    },
                  ].map((item, i) => (
                    <Card
                      key={i}
                      className={`p-4 sm:p-5 border ${item.borderColor} ${item.bg} backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.bg} mb-3`}
                      >
                        <item.icon size={20} className={item.color} />
                      </div>
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      <p className="font-bold text-sm sm:text-base truncate">
                        {item.value}
                      </p>
                    </Card>
                  ))}
                </div>

                {/* Role & Description */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  {/* Description - main column */}
                  <div className="lg:col-span-2">
                    <Card className="overflow-hidden border border-border/60 shadow-sm">
                      <div className="p-6 sm:p-8">
                        <h2 className="text-xl font-bold flex items-center gap-2.5 mb-5">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FileText
                              size={16}
                              className="text-blue-600 dark:text-blue-400"
                            />
                          </div>
                          Job Description
                        </h2>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <p className="text-[15px] leading-relaxed whitespace-pre-line text-muted-foreground">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-4">
                    {/* Key Details Card */}
                    <Card className="overflow-hidden border border-border/60 shadow-sm">
                      <div className="p-5 sm:p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                          Key Details
                        </h3>
                        <div className="space-y-4">
                          {job.role && (
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0 mt-0.5">
                                <User
                                  size={14}
                                  className="text-indigo-600 dark:text-indigo-400"
                                />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">
                                  Role
                                </p>
                                <p className="font-semibold text-sm">
                                  {job.role}
                                </p>
                              </div>
                            </div>
                          )}

                          {job.location && (
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shrink-0 mt-0.5">
                                <MapPin
                                  size={14}
                                  className="text-rose-600 dark:text-rose-400"
                                />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">
                                  Location
                                </p>
                                <p className="font-semibold text-sm">
                                  {job.location}
                                </p>
                              </div>
                            </div>
                          )}

                          {job.created_at && (
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center shrink-0 mt-0.5">
                                <Calendar
                                  size={14}
                                  className="text-sky-600 dark:text-sky-400"
                                />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">
                                  Posted On
                                </p>
                                <p className="font-semibold text-sm">
                                  {formatDate(job.created_at)}
                                </p>
                              </div>
                            </div>
                          )}

                          {job.work_location && (
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center shrink-0 mt-0.5">
                                <Globe
                                  size={14}
                                  className="text-teal-600 dark:text-teal-400"
                                />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">
                                  Work Mode
                                </p>
                                <p className="font-semibold text-sm">
                                  {job.work_location}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>

                    {/* Apply Card (for jobseekers) */}
                    {user && user.role === "jobseeker" && (
                      <Card className="overflow-hidden border-2 border-blue-200/60 dark:border-blue-800/40 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-sm">
                        <div className="p-5 sm:p-6 text-center">
                          <Sparkles
                            size={28}
                            className="text-blue-500 mx-auto mb-3"
                          />
                          <h3 className="font-bold text-base mb-1">
                            Interested?
                          </h3>
                          <p className="text-xs text-muted-foreground mb-4">
                            Apply with one click using your profile
                          </p>
                          {applied ? (
                            <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium text-sm">
                              <CheckCircle2 size={16} />
                              Already Applied
                            </div>
                          ) : (
                            <>
                              {job.is_active && (
                                <Button
                                  onClick={() => applyJobHandler(job.job_id)}
                                  disabled={btnLoading}
                                  className="w-full gap-2 h-11 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                                >
                                  <Briefcase size={16} />
                                  {btnLoading ? "Applying..." : "Apply Now"}
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Recruiter Applications Panel */}
      {user && job && user.user_id === job.posted_by_recruiter_id && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <Card className="overflow-hidden border border-border/60 shadow-sm">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-border/60 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900/50 dark:to-gray-900/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
                    <Users size={22} className="text-blue-600" />
                    Applications
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {jobApplications.length} total application
                    {jobApplications.length !== 1 ? "s" : ""} received
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
                {(
                  ["All", "Submitted", "Hired", "Rejected"] as const
                ).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${filterStatus === status
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "bg-white dark:bg-gray-800 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700 border border-border/60"
                      }`}
                  >
                    {status}
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${filterStatus === status
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-muted-foreground"
                        }`}
                    >
                      {statusCounts[status]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Application List */}
            <div className="p-6 sm:p-8">
              {jobApplications && jobApplications.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {filteredApplications.map((e) => (
                      <div
                        className="group p-5 rounded-xl border border-border/60 bg-card hover:shadow-md transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800/50"
                        key={e.application_id}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                              {e.applicant_email?.charAt(0).toUpperCase() ||
                                "A"}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">
                                {e.applicant_email}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Applied{" "}
                                {e.applied_at
                                  ? formatDate(e.applied_at)
                                  : "recently"}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${e.status === "Hired"
                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                : e.status === "Rejected"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${e.status === "Hired"
                                  ? "bg-emerald-500"
                                  : e.status === "Rejected"
                                    ? "bg-red-500"
                                    : "bg-amber-500"
                                }`}
                            />
                            {e.status}
                          </span>
                        </div>

                        {/* Action Links */}
                        <div className="flex items-center gap-3 mb-4">
                          <Link
                            target="_blank"
                            href={e.resume}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
                          >
                            <FileText size={13} />
                            Resume
                          </Link>

                          <Link
                            target="_blank"
                            href={`/account/${e.applicant_id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors duration-200"
                          >
                            <ExternalLink size={13} />
                            Profile
                          </Link>
                        </div>

                        {/* Update Status */}
                        <div className="flex gap-2 pt-4 border-t border-border/40">
                          <select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="flex-1 h-10 px-3 text-sm border border-border/60 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                          >
                            <option value="">Update status...</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <Button
                            disabled={btnLoading}
                            onClick={() =>
                              updateApplicationHandler(e.application_id)
                            }
                            size="sm"
                            className="h-10 px-5 rounded-lg font-medium cursor-pointer"
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredApplications.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                        <Users
                          size={28}
                          className="text-muted-foreground/50"
                        />
                      </div>
                      <p className="text-muted-foreground font-medium">
                        No applications with &ldquo;{filterStatus}&rdquo; status
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Try selecting a different filter
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <Briefcase
                      size={32}
                      className="text-muted-foreground/40"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    No applications yet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Applications will appear here once candidates apply
                  </p>
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

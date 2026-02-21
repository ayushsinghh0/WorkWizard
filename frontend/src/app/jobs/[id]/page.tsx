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
  const [statusUpdates, setStatusUpdates] = useState<Record<number, string>>({});
  const token = Cookies.get("token");

  useEffect(() => {
    if (applications && id) {
      applications.forEach((item: { job_id: number }) => {
        if (item.job_id.toString() === id) setApplied(true);
      });
    }
  }, [applications, id]);

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

  useEffect(() => { fetchSingleJob(); }, [id]);

  async function fetchJobApplications() {
    try {
      const { data } = await axios.get(`${job_service}/api/job/application/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobApplications(data);
    } catch (error) { console.log(error); }
  }

  useEffect(() => {
    if (user && job && user.user_id === job.posted_by_recruiter_id) fetchJobApplications();
  }, [user, job]);

  const updateApplicationHandler = async (applicationId: number) => {
    const selectedStatus = statusUpdates[applicationId];
    if (!selectedStatus) return toast.error("Please select a valid status");
    try {
      const { data } = await axios.put(
        `${job_service}/api/job/application/update/${applicationId}`,
        { status: selectedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message || "Application updated");
      fetchJobApplications();
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error) ? error.response?.data?.message || "Update failed" : "Update failed");
    }
  };

  const handleStatusSelect = (applicationId: number, value: string) => {
    setStatusUpdates((prev) => ({ ...prev, [applicationId]: value }));
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const getTimeSince = (dateString: string) => {
    const diffDays = Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const filteredApplications = filterStatus === "All"
    ? jobApplications
    : jobApplications.filter((app) => app.status === filterStatus);

  const statusCounts = {
    All: jobApplications.length,
    Submitted: jobApplications.filter((a) => a.status === "Submitted").length,
    Hired: jobApplications.filter((a) => a.status === "Hired").length,
    Rejected: jobApplications.filter((a) => a.status === "Rejected").length,
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/50 via-background to-purple-50/30 dark:from-violet-950/15 dark:via-background dark:to-purple-950/10 py-8 px-4 sm:px-6">
      {job && (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 text-sm font-semibold"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT — Main Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Header Card */}
              <Card className="p-6 sm:p-8 border border-violet-100 dark:border-violet-900/40 shadow-lg shadow-violet-100/30 dark:shadow-violet-900/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Logo */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl border-2 border-violet-100 dark:border-violet-800 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                    {job.company_logo ? (
                      <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <Building2 size={36} className="text-violet-400/50" />
                    )}
                  </div>

                  {/* Title & Meta */}
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${job.is_active
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${job.is_active ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                        {job.is_active ? "Actively Hiring" : "Closed"}
                      </span>
                      {job.created_at && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                          <Clock size={14} /> Posted {getTimeSince(job.created_at)}
                        </span>
                      )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">{job.title}</h1>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-muted-foreground font-medium">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Building2 size={16} className="text-violet-600 dark:text-violet-400" />
                        {job.company_name}
                      </div>
                      {job.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={15} /> {job.location}
                        </div>
                      )}
                      {job.role && (
                        <div className="flex items-center gap-1.5">
                          <User size={15} /> {job.role}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Description Card */}
              <Card className="p-6 sm:p-8 border border-violet-100 dark:border-violet-900/40 shadow-lg shadow-violet-100/30 dark:shadow-violet-900/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <FileText className="text-violet-600 dark:text-violet-400" size={22} />
                  Job Description
                </h2>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{job.description}</p>
                </div>
              </Card>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 border border-violet-100 dark:border-violet-900/40 shadow-lg shadow-violet-100/30 dark:shadow-violet-900/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl sticky top-6">
                <h3 className="text-lg font-bold mb-5 text-foreground">Job Overview</h3>

                <div className="space-y-4">
                  {[
                    { icon: DollarSign, color: "violet", label: "Salary", value: job.salary ? `₹${job.salary.toLocaleString("en-IN")} P.A` : "Not disclosed" },
                    { icon: Briefcase, color: "purple", label: "Job Type", value: job.job_type || "Full-time" },
                    { icon: Laptop, color: "fuchsia", label: "Work Mode", value: job.work_location || "On-site" },
                    { icon: Users, color: "violet", label: "Openings", value: `${job.openings} Position${job.openings !== 1 ? "s" : ""}` },
                  ].map(({ icon: Icon, color, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 flex items-center justify-center shrink-0`}>
                        <Icon size={19} className={`text-${color}-600 dark:text-${color}-400`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="font-bold text-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  {applied ? (
                    <Button variant="outline" className="w-full h-12 gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 cursor-default">
                      <CheckCircle2 size={18} /> Applied Successfully
                    </Button>
                  ) : (
                    job.is_active && (
                      <Button
                        onClick={() => applyJob(job.job_id)}
                        disabled={btnLoading}
                        className="w-full h-12 gap-2 text-base font-bold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-violet-500/30 transition-all"
                      >
                        <Sparkles size={18} />
                        {btnLoading ? "Applying..." : "Apply Now"}
                      </Button>
                    )
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* RECRUITER — Applications Panel */}
      {user && job && user.user_id === job.posted_by_recruiter_id && (
        <div className="max-w-6xl mx-auto mt-12 animate-in slide-in-from-bottom-4 duration-500">
          <Card className="border border-violet-100 dark:border-violet-900/40 shadow-xl shadow-violet-100/30 dark:shadow-violet-900/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl overflow-hidden">

            {/* Panel Header */}
            <div className="p-6 sm:p-8 border-b border-violet-100 dark:border-violet-800/50 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/30">
              <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                Applicant Tracking
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage {jobApplications.length} candidate{jobApplications.length !== 1 ? "s" : ""} for this role.
              </p>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
                {(["All", "Submitted", "Hired", "Rejected"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${filterStatus === status
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white border-transparent shadow-sm"
                        : "bg-background text-muted-foreground border-violet-100 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 dark:hover:text-violet-300"
                      }`}
                  >
                    {status}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${filterStatus === status ? "bg-white/25 text-white" : "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
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
                        className="p-4 sm:p-5 rounded-xl border border-violet-100 dark:border-violet-800/50 bg-background hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        key={app.application_id}
                      >
                        {/* Candidate Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center font-extrabold text-lg shrink-0 shadow-sm">
                            {app.applicant_email?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{app.applicant_email}</p>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                <Calendar size={11} /> {app.applied_at ? formatDate(app.applied_at) : "Recently"}
                              </p>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${app.status === "Hired"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                  : app.status === "Rejected"
                                    ? "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                }`}>
                                {app.status === "Hired" && <CheckCircle2 size={11} />}
                                {app.status === "Rejected" && <XCircle size={11} />}
                                {app.status === "Submitted" && <Clock size={11} />}
                                {app.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t lg:border-none border-violet-50 dark:border-violet-900/30 pt-4 lg:pt-0">
                          <div className="flex items-center gap-2">
                            <Link target="_blank" href={app.resume} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full gap-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/20 border-violet-200 dark:border-violet-800">
                                <FileText size={15} /> Resume
                              </Button>
                            </Link>
                            <Link target="_blank" href={`/account/${app.applicant_id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                                <ExternalLink size={15} /> Profile
                              </Button>
                            </Link>
                          </div>

                          <div className="w-px h-8 bg-violet-100 dark:bg-violet-800 hidden sm:block mx-1" />

                          <div className="flex items-center gap-2">
                            <select
                              value={statusUpdates[app.application_id] || ""}
                              onChange={(e) => handleStatusSelect(app.application_id, e.target.value)}
                              className="flex-1 sm:w-[130px] h-9 px-3 text-sm font-medium border border-violet-200 dark:border-violet-800 rounded-lg bg-background focus:ring-2 focus:ring-violet-500 transition-all cursor-pointer"
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
                              className="h-9 px-4 shrink-0 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-violet-100 dark:border-violet-800/50 rounded-xl">
                      <p className="font-bold">No {filterStatus} applications</p>
                      <p className="text-sm text-muted-foreground mt-1">Try changing your filter criteria.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-violet-100 dark:border-violet-800/50 rounded-xl bg-violet-50/30 dark:bg-violet-950/10">
                  <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mx-auto mb-4">
                    <Users size={28} className="text-violet-500 dark:text-violet-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">No applications yet</h3>
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
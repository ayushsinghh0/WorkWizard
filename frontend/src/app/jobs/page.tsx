"use client";
import { Job } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Briefcase, Filter, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { job_service } from "@/context/appContext";
import { Loading } from "@/components/loading";
import JobCard from "@/components/job-card";

const locations: string[] = [
  "Delhi", "Mumbai", "Banglore", "Hyderabad",
  "Pune", "Kolkata", "Chennai", "Remote",
];

const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const token = Cookies.get("token");
  const ref = useRef<HTMLButtonElement>(null);

  async function fetchJobs() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/all?title=${title}&location=${location}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchJobs(); }, [title, location]);

  const clearFilter = () => {
    setTitle("");
    setLocation("");
    fetchJobs();
    ref.current?.click();
  };

  const hasActiveFilters = title || location;

  return (
    <div className="min-h-screen relative">
      {/* Page background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-background to-purple-50/40 dark:from-violet-950/15 dark:via-background dark:to-purple-950/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight">
                Explore{" "}
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Opportunities
                </span>
              </h1>
              <p className="text-muted-foreground font-medium">
                {jobs.length} {jobs.length === 1 ? "job" : "jobs"} available right now
              </p>
            </div>

            <Button
              className="gap-2 h-11 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-sm shadow-violet-400/30"
              onClick={() => ref.current?.click()}
            >
              <SlidersHorizontal size={17} />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/30 text-white text-xs font-bold">
                  Active
                </span>
              )}
            </Button>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-sm font-semibold text-muted-foreground">Filters:</span>
              {title && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm border border-violet-200 dark:border-violet-800 font-medium">
                  <Search size={13} /> {title}
                  <button onClick={() => setTitle("")} className="hover:bg-violet-200 dark:hover:bg-violet-800 rounded-full p-0.5 transition-colors">
                    <X size={13} />
                  </button>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm border border-violet-200 dark:border-violet-800 font-medium">
                  <MapPin size={13} /> {location}
                  <button onClick={() => setLocation("")} className="hover:bg-violet-200 dark:hover:bg-violet-800 rounded-full p-0.5 transition-colors">
                    <X size={13} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Job Listing */}
        {loading ? (
          <Loading />
        ) : (
          <>
            {jobs && jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {jobs.map((job) => (
                  <JobCard job={job} key={job.job_id} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-5">
                  <Briefcase size={36} className="text-violet-500 dark:text-violet-400 opacity-70" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Jobs Found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </>
        )}

        {/* Filter Dialog (hidden trigger) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button ref={ref} className="hidden" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] border-violet-100 dark:border-violet-900">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Filter className="text-violet-600 dark:text-violet-400" />
                Filter Jobs
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
                  <Search size={15} className="text-violet-600" /> Search by Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g. React Developer, Designer..."
                  className="h-11 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2">
                  <MapPin size={15} className="text-violet-600" /> Location
                </Label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 px-3 border-2 border-violet-200 dark:border-violet-800 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm font-medium transition-colors"
                >
                  <option value="">All Locations</option>
                  {locations.map((e) => (
                    <option value={e} key={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={clearFilter}
                className="flex-1 border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 dark:hover:text-violet-300"
              >
                Clear All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JobsPage;

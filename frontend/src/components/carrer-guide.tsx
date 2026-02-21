"use client";

import { CareerGuideResponse } from "@/type";
import axios from "axios";
import { ArrowRight, BookOpen, Briefcase, Lightbulb, Loader2, Sparkles, Target, TrendingUp, X } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { utils_service } from "@/context/appContext";
import toast from "react-hot-toast";

const CarrerGuide = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerGuideResponse | null>(null);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addSkill();
  };

  const getCarrerGuidance = async () => {
    if (!skills.length || skills.every((s) => !s.trim())) {
      toast.error("Please add at least one skill");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${utils_service}/api/utils/carrer`, { skills });
      setResponse(data);
      toast.success("Career guidance generated!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Server error");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSkills([]);
    setCurrentSkill("");
    setResponse(null);
    setOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 mb-5 shadow-sm">
          <Sparkles size={15} className="text-violet-600 dark:text-violet-400" />
          <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
            AI-Powered Career Guidance
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Career Path
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Get personalized job recommendations and a learning roadmap tailored to your skills.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="gap-2 h-12 px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/30 text-white border-0 transition-all duration-300"
            >
              <Sparkles size={18} />
              Get Career Guidance
              <ArrowRight size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-violet-100 dark:border-violet-900">
            {!response ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="text-violet-600 dark:text-violet-400" />
                    Tell us about your skills
                  </DialogTitle>
                  <DialogDescription>
                    Add your technical skills to receive personalized career recommendations.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill">Add Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skill"
                        placeholder="e.g., React, Node.js, Python..."
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        className="h-11 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500"
                        onKeyDown={handleKeyPress}
                      />
                      <Button
                        onClick={addSkill}
                        className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div className="space-y-2">
                      <Label>Your Skills ({skills.length})</Label>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => (
                          <div
                            key={s}
                            className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-700"
                          >
                            <span className="text-sm font-semibold text-violet-800 dark:text-violet-200">{s}</span>
                            <button
                              onClick={() => removeSkill(s)}
                              className="h-5 w-5 rounded-full bg-violet-500 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={getCarrerGuidance}
                    disabled={loading || skills.length === 0}
                    className="w-full h-11 gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Analyzing your skills...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Generate Career Guidance
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Target className="text-violet-600 dark:text-violet-400" />
                    Your Career Roadmap
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="text-violet-600 dark:text-violet-400 mt-1 shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold mb-2 text-violet-800 dark:text-violet-200">Career Summary</h3>
                        <p className="text-sm leading-relaxed opacity-90">{response?.summary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Job Options */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Briefcase size={20} className="text-violet-600 dark:text-violet-400" />
                      Recommended Career Paths
                    </h3>
                    <div className="space-y-3">
                      {response?.jobOptions?.map((job, index) => (
                        <div className="p-4 rounded-xl border border-violet-100 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50/50 dark:hover:bg-violet-950/30 transition-colors" key={index}>
                          <h4 className="font-bold text-base mb-2 text-violet-800 dark:text-violet-200">{job.title}</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold opacity-70">Responsibilities: </span><span className="opacity-80">{job.responsibilities}</span></p>
                            <p><span className="font-semibold opacity-70">Why this role: </span><span className="opacity-80">{job.why}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills to learn */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <TrendingUp size={20} className="text-violet-600 dark:text-violet-400" />
                      Skills to Enhance Your Career
                    </h3>
                    <div className="space-y-4">
                      {response?.skillsToLearn?.map((category, index) => (
                        <div className="space-y-2" key={index}>
                          <h4 className="font-bold text-sm text-violet-600 dark:text-violet-400 uppercase tracking-wide">{category.category}</h4>
                          <div className="space-y-2">
                            {category?.skills?.map((skill, sindex) => (
                              <div key={sindex} className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-800/50">
                                <p className="font-semibold mb-1 text-sm">{skill.title}</p>
                                <p className="text-xs opacity-70 mb-1"><span className="font-semibold">Why: </span>{skill.why}</p>
                                <p className="text-xs opacity-70"><span className="font-semibold">How: </span>{skill.how}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Approach */}
                  <div className="p-4 rounded-xl border border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <BookOpen size={20} className="text-violet-600 dark:text-violet-400" />
                      {response?.learningApproach?.title}
                    </h3>
                    <ul className="space-y-2">
                      {response?.learningApproach?.points?.map((point, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-violet-600 dark:text-violet-400 mt-0.5 font-bold">•</span>
                          <span className="opacity-90" dangerouslySetInnerHTML={{ __html: point }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={resetDialog} variant="outline" className="w-full border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 dark:hover:text-violet-300">
                    Start New Analysis
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CarrerGuide;
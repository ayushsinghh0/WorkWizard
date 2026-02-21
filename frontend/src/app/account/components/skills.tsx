"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/context/appContext";
import { AccountProps } from "@/type";
import { Award, Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

const Skills: React.FC<AccountProps> = ({ user, isYourAccount }) => {
    const { addSkill, btnLoading, removeSkill } = useAppData();
    const [skill, setSkill] = useState("");

    const addSkillHandler = () => {
        if (!skill.trim()) { alert("Please enter a skill"); return; }
        addSkill(skill, setSkill);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addSkillHandler();
    };

    const removeSkillHandler = (skillToRemove: string) => {
        if (confirm(`Are you sure you want to remove ${skillToRemove}?`)) {
            removeSkill(skillToRemove);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <Card className="shadow-xl border border-violet-100 dark:border-violet-900/40 overflow-hidden rounded-2xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 border-b relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                    />
                    <div className="relative flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Award size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-white">
                                {isYourAccount ? "Your Skills" : "User Skills"}
                            </h2>
                            {isYourAccount && (
                                <p className="text-sm text-white/80 mt-0.5">Showcase your skills and expertise</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add Skill Input */}
                {isYourAccount && (
                    <div className="flex gap-3 flex-col sm:flex-row p-4 border-b border-violet-50 dark:border-violet-900/30 bg-violet-50/30 dark:bg-violet-950/10">
                        <div className="relative flex-1">
                            <Sparkles size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500 opacity-60" />
                            <Input
                                type="text"
                                placeholder="e.g. Node.js, React, Python..."
                                className="h-11 pl-10 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500 bg-background"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <Button
                            onClick={addSkillHandler}
                            className="h-11 gap-2 px-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-sm shadow-violet-400/30"
                            disabled={!skill.trim() || btnLoading}
                        >
                            <Plus size={17} /> Add Skill
                        </Button>
                    </div>
                )}

                {/* Skill Tags */}
                <CardContent className="p-6">
                    {user.skills && user.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {user.skills.map((e, i) => (
                                <div
                                    key={i}
                                    className="group relative inline-flex items-center gap-2 border-2 border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/30 rounded-full hover:border-violet-500 hover:shadow-sm hover:shadow-violet-200/50 dark:hover:shadow-violet-900/30 duration-200 transition-all pl-4 pr-3 py-2"
                                >
                                    <span className="font-semibold text-sm text-violet-800 dark:text-violet-200">{e}</span>
                                    {isYourAccount && (
                                        <button
                                            onClick={() => removeSkillHandler(e)}
                                            className="h-5 w-5 rounded-full bg-violet-200 dark:bg-violet-700 text-violet-700 dark:text-violet-200 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all hover:scale-110"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-4">
                                <Award size={28} className="text-violet-500 dark:text-violet-400 opacity-70" />
                            </div>
                            <CardDescription className="text-base">
                                {isYourAccount ? "No skills added yet. Start building your profile!" : "No skills added by user."}
                            </CardDescription>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Skills;
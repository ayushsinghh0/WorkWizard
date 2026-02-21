import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/appContext";
import { AccountProps } from "@/type";
import {
    AlertTriangle, Briefcase, Camera, CheckCircle2, Crown, Edit,
    FileText, Mail, NotebookText, Phone, RefreshCcw, UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";

const now = Date.now();

const Info: React.FC<AccountProps> = ({ user, isYourAccount }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const editRef = useRef<HTMLButtonElement>(null);
    const resumeRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");

    const { updateProfilePic, updateResume, btnLoading, updateUser } = useAppData();

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            updateProfilePic(formData);
        }
    };

    const ChangeResume = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") { alert("Please upload a PDF file"); return; }
            const formData = new FormData();
            formData.append("file", file);
            updateResume(formData);
        }
    };

    const handleEditClick = () => {
        editRef.current?.click();
        setName(user.name);
        setPhoneNumber(user.phone_number);
        setBio(user.bio || "");
    };

    const router = useRouter();

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <Card className="overflow-hidden shadow-xl border border-violet-100 dark:border-violet-900/40 rounded-2xl">

                {/* Cover banner */}
                <div className="h-36 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 relative">
                    <div className="absolute inset-0 opacity-30"
                        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                    />
                    {/* Avatar */}
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden shadow-2xl bg-background ring-4 ring-violet-200 dark:ring-violet-800">
                                <img src={user.profile_pic ? user.profile_pic : "/user.png"} alt="" className="w-full h-full object-cover" />
                            </div>
                            {isYourAccount && (
                                <>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={() => inputRef.current?.click()}
                                        className="absolute bottom-1 right-1 rounded-full h-9 w-9 shadow-lg bg-violet-600 hover:bg-violet-700 text-white border-0"
                                    >
                                        <Camera size={15} />
                                    </Button>
                                    <input type="file" className="hidden" accept="image/*" ref={inputRef} onChange={changeHandler} />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="pt-20 pb-8 px-8">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-extrabold tracking-tight">{user.name}</h1>
                                {isYourAccount && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40" onClick={handleEditClick}>
                                        <Edit size={15} />
                                    </Button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Briefcase size={15} className="text-violet-500" />
                                <span className="capitalize font-semibold text-violet-600 dark:text-violet-400">{user.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    {user.role === "jobseeker" && user.bio && (
                        <div className="mt-6 p-4 rounded-xl border border-violet-100 dark:border-violet-800/50 bg-violet-50/40 dark:bg-violet-950/20">
                            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-violet-700 dark:text-violet-300">
                                <FileText size={15} /> About
                            </div>
                            <p className="text-base leading-relaxed">{user.bio}</p>
                        </div>
                    )}

                    {/* Contact */}
                    <div className="mt-8">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Mail size={19} className="text-violet-600 dark:text-violet-400" />
                            Contact Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { label: "Email", value: user.email, icon: Mail },
                                { label: "Phone No.", value: user.phone_number, icon: Phone },
                            ].map(({ label, value, icon: Icon }) => (
                                <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-violet-100 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50/30 dark:hover:bg-violet-950/20 transition-all">
                                    <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                                        <Icon size={17} className="text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">{label}</p>
                                        <p className="text-sm font-semibold truncate">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resume */}
                    {user.role === "jobseeker" && user.resume && (
                        <div className="mt-8">
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <NotebookText size={19} className="text-violet-600 dark:text-violet-400" />
                                Resume
                            </h2>
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-violet-100 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50/30 dark:hover:bg-violet-950/20 transition-all">
                                <div className="h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                                    <NotebookText size={20} className="text-violet-600 dark:text-violet-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold">Resume Document</p>
                                    <Link href={user.resume} className="text-sm text-violet-600 dark:text-violet-400 hover:underline" target="_blank">
                                        View Resume PDF
                                    </Link>
                                </div>
                                {isYourAccount && (
                                    <>
                                        <Button variant="outline" size="sm" onClick={() => resumeRef.current?.click()} className="gap-2 border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700">
                                            Update
                                        </Button>
                                        <input type="file" ref={resumeRef} className="hidden" accept="application/pdf" onChange={ChangeResume} />
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Subscription */}
                    {isYourAccount && user.role === "jobseeker" && (
                        <div className="mt-8">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Crown size={19} className="text-violet-600 dark:text-violet-400" />
                                Subscription Status
                            </h2>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/30 border border-violet-100 dark:border-violet-800/50">
                                {!user.subscription ? (
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <p className="font-bold text-lg mb-1">No Active Subscription</p>
                                            <p className="text-sm text-muted-foreground">Subscribe to unlock premium features and benefits.</p>
                                        </div>
                                        <Button
                                            className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-sm shadow-violet-400/30"
                                            onClick={() => router.push("/subscribe")}
                                        >
                                            <Crown size={17} /> Subscribe Now
                                        </Button>
                                    </div>
                                ) : new Date(user.subscription).getTime() > now ? (
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle2 size={19} className="text-green-600" />
                                                <p className="font-bold text-lg text-green-600">Active Subscription</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Valid until: {new Date(user.subscription).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-sm">
                                            <CheckCircle2 size={17} /> Subscribed
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertTriangle size={19} className="text-red-600" />
                                                <p className="font-bold text-lg text-red-600">Subscription Expired</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Expired on: {new Date(user.subscription).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                            </p>
                                        </div>
                                        <Button variant="destructive" className="gap-2" onClick={() => router.push("/subscribe")}>
                                            <RefreshCcw size={17} /> Renew Now
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Edit Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button ref={editRef} variant="outline" className="hidden">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] border-violet-100 dark:border-violet-900">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <Edit className="text-violet-600 dark:text-violet-400" size={22} />
                            Edit Profile
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-4">
                        {[
                            { id: "name", label: "Full Name", icon: UserIcon, type: "text", value: name, setter: setName, placeholder: "Enter your name" },
                            { id: "phone", label: "Phone", icon: Phone, type: "number", value: phonenumber, setter: setPhoneNumber, placeholder: "Enter your phone number" },
                        ].map(({ id, label, icon: Icon, type, value, setter, placeholder }) => (
                            <div key={id} className="space-y-2">
                                <Label htmlFor={id} className="text-sm font-semibold flex items-center gap-2">
                                    <Icon size={15} className="text-violet-600" /> {label}
                                </Label>
                                <Input id={id} type={type} placeholder={placeholder} className="h-11 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500" value={value} onChange={(e) => setter(e.target.value)} />
                            </div>
                        ))}
                        {user.role === "jobseeker" && (
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-sm font-semibold flex items-center gap-2">
                                    <FileText size={15} className="text-violet-600" /> Bio
                                </Label>
                                <Input id="bio" type="text" placeholder="Enter your bio" className="h-11 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                disabled={btnLoading}
                                onClick={() => updateUser(name, phonenumber, bio)}
                                className="w-full h-11 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                            >
                                {btnLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Info;
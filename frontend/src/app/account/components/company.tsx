"use client";
import { job_service, useAppData } from "@/context/appContext";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { Loading } from "@/components/loading";
import { Card, CardDescription } from "@/components/ui/card";
import {
  Briefcase, Building2, Eye, FileText, Globe, Image, Plus, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company as CompanyType } from "@/type";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Company = () => {
  const { loading } = useAppData();
  const addRef = useRef<HTMLButtonElement | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [companyLoading, setCompanyLoading] = useState(true);

  const token = Cookies.get("token");

  const clearData = () => { setName(""); setDescription(""); setWebsite(""); setLogo(null); };

  async function fetchCompanies() {
    try {
      const { data } = await axios.get(`${job_service}/api/job/company/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCompanyLoading(false);
    }
  }

  async function addCompanyHandler() {
    if (!name || !description || !website || !logo) return alert("Please provide all details");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("file", logo);
    try {
      setBtnLoading(true);
      const { data } = await axios.post(`${job_service}/api/job/company/new`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);
      clearData();
      fetchCompanies();
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error) ? error.response?.data?.message || "Failed" : "Failed");
    } finally {
      setBtnLoading(false);
    }
  }

  async function deleteCompany(id: string) {
    if (!confirm("Are you sure you want to delete this company?")) return;
    try {
      setBtnLoading(true);
      const { data } = await axios.delete(`${job_service}/api/job/company/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);
      fetchCompanies();
    } catch (error) {
      toast.error(axios.isAxiosError(error) ? error.response?.data?.message || "Failed" : "Failed");
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => { fetchCompanies(); }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Card className="shadow-xl border border-violet-100 dark:border-violet-900/40 overflow-hidden rounded-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">My Companies</h2>
                <p className="text-sm text-white/80 mt-0.5">
                  Manage your registered companies ({companies.length}/3)
                </p>
              </div>
            </div>
            {companies.length < 3 && (
              <Button
                onClick={() => addRef.current?.click()}
                className="gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all"
              >
                <Plus size={17} /> Add Company
              </Button>
            )}
          </div>
        </div>

        {/* List */}
        {companyLoading ? (
          <Loading />
        ) : (
          <div className="p-6">
            {companies.length > 0 ? (
              <div className="grid gap-4">
                {companies.map((c) => (
                  <div
                    key={c.company_id}
                    className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 border-violet-100 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20 transition-all bg-background"
                  >
                    <div className="h-16 w-16 rounded-2xl border-2 border-violet-100 dark:border-violet-800 overflow-hidden shrink-0 bg-background p-1">
                      <img src={c.logo} alt={c.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-0.5 truncate">{c.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-1.5">{c.description}</p>
                      <a
                        href={c.website}
                        target="_blank"
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 font-semibold"
                        rel="noreferrer"
                      >
                        <Globe size={12} /> {c.website}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/company/${c.company_id}`}>
                        <Button variant="outline" size="icon" className="h-9 w-9 border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 dark:hover:text-violet-300 hover:border-violet-400">
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => deleteCompany(c.company_id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-4">
                  <Building2 size={28} className="text-violet-500 dark:text-violet-400 opacity-70" />
                </div>
                <CardDescription className="text-base mb-2">No companies registered yet</CardDescription>
                <p className="text-sm text-muted-foreground">Add your first company to start posting jobs.</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Add Company Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" ref={addRef} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] border-violet-100 dark:border-violet-900">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Building2 className="text-violet-600 dark:text-violet-400" size={22} />
              Add New Company
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {[
              { id: "name", label: "Company Name", icon: Briefcase, type: "text", value: name, setter: setName, placeholder: "Enter company name" },
              { id: "description", label: "Description", icon: FileText, type: "text", value: description, setter: setDescription, placeholder: "Enter description" },
              { id: "website", label: "Website", icon: Globe, type: "text", value: website, setter: setWebsite, placeholder: "https://yourcompany.com" },
            ].map(({ id, label, icon: Icon, type, value, setter, placeholder }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id} className="text-sm font-semibold flex items-center gap-2">
                  <Icon size={15} className="text-violet-600 dark:text-violet-400" /> {label}
                </Label>
                <Input
                  id={id} type={type} placeholder={placeholder} className="h-11 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500"
                  value={value} onChange={(e) => setter(e.target.value)}
                />
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="logo" className="text-sm font-semibold flex items-center gap-2">
                <Image size={15} className="text-violet-600 dark:text-violet-400" /> Company Logo
              </Label>
              <Input
                id="logo" type="file" accept="image/*"
                className="h-11 cursor-pointer border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogo(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={btnLoading}
              onClick={addCompanyHandler}
              className="w-full h-11 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
            >
              {btnLoading ? "Adding Company..." : "Add Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Company;

"use client"


import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { job_service, useAppData } from "@/context/appContext";
import { Company, Job } from "@/type";
import axios from "axios";
import { Loading } from "@/components/loading";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const CompanyPage = () =>{

    const {id} = useParams()
    const token=Cookies.get("token")

    const {user,isAuth}=useAppData()
    const [loading,setLoading]=useState(false)
    const [btnLoading,setBtnLoading]=useState(false)
    const [company,setCompany]=useState<Company | null>(null)
    const [isUpdatedModalOpen,setIsUpdatedModalOpen]=useState(false)
    const [selectedJob,setSelectedJob]=useState<Job |null>(null)

    const addModalRef=useRef<HTMLButtonElement> (null)
    const updatedModalRef=useRef<HTMLButtonElement>(null)

    const [title,setTitle]=useState("")
    const [description,setdescription]=useState("")
    const [role,setrole]=useState("")
    const [salary,setsalary]=useState("")
    const [location,setlocation]=useState("")
    const [opening,setopening]=useState("")
    const [job_type,setjob_type]=useState("")
    const [work_location,setwork_location]=useState("")
    const [is_active,setis_active]=useState(true)


    const clearInput= ()=>{
        setTitle("");
        setdescription("");
        setrole("");
        setsalary("");
        setlocation("");
        setopening("");
        setjob_type("");
        setwork_location("")
        setis_active(true)
    }

    const addJobHandler = async()=>{
        setBtnLoading(true)
        try{
            const jobData = {
                title,description,role,salary:Number(salary),
                location,openings:Number(opening),
                job_type,work_location,company_id:id,
            };
            await axios.post(`${job_service}/api/job/new`,jobData,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("New job posted successfully");
            fetchCompany()
            clearInput()
            addModalRef.current?.click();
        } catch(error){
            console.log(error)
             if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || "Login failed");
                } else {
                    toast.error("Login failed");
                }

        } finally {
            setBtnLoading(false)
        }
    }


    

    async function fetchCompany() {
        try {
            setBtnLoading(true)
            const {data}=await axios.get(`${job_service}/api/job/company/${id}`)
            setCompany(data)
        } catch (error) {
            console.log(error)
        } finally {
            setBtnLoading(false)
        }
        
    }
    useEffect(()=>{
        fetchCompany()
    },[id])

    

    const isRecruiterOwner =user && company && user.user_id===company.recruiter_id;

    const deleteHandler = async (jobId:number) =>{
        if(confirm("Are you sure you want to delete this job")){
            setBtnLoading(true)

            try{
                await axios.delete(`${job_service}/api/job/${jobId}`,
                   { headers:{
                        Authorization: `Bearer ${token}`
                    }}
                )

                toast.success("job has been deleted");
                fetchCompany()
            }
        catch(error) {
             if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || "Login failed");
                } else {
                    toast.error("Login failed");
                }

        } finally {
            setBtnLoading(false)
        }
    } 
        
    }


    const updateOpenUpdateModal=(job:Job)=>{
        setSelectedJob(job);
        setTitle(job.title);
        setdescription(job.description);
        setrole(job.role);
        setsalary(String(job.salary || ""));
        setlocation(job.location||"");
        setopening(String(job.openings));
        setjob_type(job.job_type);
        setwork_location(job.work_location);
        setis_active(job.is_active);
        setIsUpdatedModalOpen(true);
    }

    const handleCloseUpdateModal =() =>{
        setIsUpdatedModalOpen(false);
        setSelectedJob(null);
        clearInput()
    };

    const updateJobHandler=async()=>{
        if(!selectedJob) return ;
        
        
        setBtnLoading(true);

        try {
             const updateData = {
                title,description,role,salary:Number(salary),
                location,openings:Number(opening),
                job_type,work_location,is_active,
            };

            axios.put(`${job_service}/api/job/${selectedJob}`,updateData,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("job updated successfully")
            fetchCompany()
            handleCloseUpdateModal()

            
        } catch (error) {
            
        if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || "Login failed");
                } else {
                    toast.error("Login failed");
                }

        } finally {
            setBtnLoading(false)
        }
    }
    if(loading){
        return <Loading />
    }


    return <div className="min-h-screen bg-secondary/30 ">
        {
            company && <div className="max-w-6xl mx-auto px-4 py-8">
                <Card className="overflow-hidden shadow-lg border-2 mb-8 ">
                    <div className="h-32 bg-blue-500"></div>
                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16">
                            <div className="w-32 h-32 rounded-2xl border-4 border-background overflow-hidden shadow-xl bg-background shrink-0">
                                <img src={company.logo} alt="" className="w-full h-full object-cover"/>
                            </div>

                            <div className="flex-1 md:mb-4">
                                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                                <p className="text-base leading-relaxed opacity-80 max-w-3xl">{company.description}</p>
                            </div>

                            <Link href={company.website} target="_blank" className="md:mb-4">
                                <Button className = "gap-2">
                                    <Globe size={18} /> Visit Website
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>

                <Dialog>
                    {/* job section */}
                    <Card className="shadow-lg border-2 overflow-hidden">
                        <div className="bg-blue-500 border-b p-6">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <Briefcase size={20} className="text-blue-600" />
                                    </div>

                                </div>
                                <h2 className="text-2xl font-bold text-white">Open Position</h2>
                                <p className="text-sm opacity-70 text-white">{company.jobs?.length || 0}active jobs {company.jobs?.length!==1 ? "s" : ""}</p>
                            </div>
                        </div>

                        {isRecruiterOwner && <>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus size={18}/>
                                    Post New Job
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm :max-w-[600px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl flex items-center gap-2 ">
                                        Post a new job
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="">
                                    
                                </div>
                            </DialogContent>
                            </>}
                    </Card>

                </Dialog>
            </div>
        }
            
    </div>
}
export default CompanyPage

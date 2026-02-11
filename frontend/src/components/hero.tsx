import {Button} from "@/components/ui/button"
import { ArrowRight, Briefcase, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react" ;














const Hero = ()=>{
    return (
      <section className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 opacity-5 ">hii
            <div className="absolute top-28 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl">hii</div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500  rounded-full blur-3xl"></div></div>
            <div className="container mx-auto px-5 py-16 md:py-24 relative">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm">
                            <TrendingUp size={16} className="text-blue-600"/>
                                <span className="text-sm font-medium">#1 Job platform in india</span>
                        </div>
                        {/* main headingss */}

                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Find Your Dream Job at {" "} <span className="inline-block">
                                Work <span className="text-violet-400">Wizard</span>
                                </span> 
                          </h1>

                          {/* DESCription yaa now */}
                          <p className="text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl">
                            {/* <blockquote className="mt-6 border-l-2 pl-6 italic">
                            
                            </blockquote> */}Connect with top employers,  and discover oppurtinities that match your skills, whether you are a job seeker or recruiter , we have got you covered with powerful tools and seamless experience..
                                                
                          </p>
                          {/*  stats */}
                          <div className="flex flex-wrap justify-center md:justify-start gap-8 py-4">
                            <div className="text-center md:text-left">
                                <p className="text-3xl font-bold text-blue-600">10k+</p>
                                <p className="text-sm opacity-70 ">Active Jobs</p>
                            </div>
                             <div className="text-center md:text-left">
                                <p className="text-3xl font-bold text-blue-600">5k+</p>
                                <p className="text-sm opacity-70 ">companies</p>
                            </div>
                             <div className="text-center md:text-left">
                                <p className="text-3xl font-bold text-blue-600">50k+</p>
                                <p className="text-sm opacity-70 ">Active Job Seekers</p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href={'/jobs'}>
                              <Button size={"lg"} className="text-base px-8 h-12 gap-2 group transition-all">
                                <Search size={18}/>
                                Browse Jobs <ArrowRight size={18} 
                                className="group-hover:translate-x-1 transition-transform"/>

                              </Button>
                            </Link>
                            <Link href={'/about'}>
                                <Button variant={"outline"} size = {"lg"}
                                className="text-base px-8 h-12 gap-2">
                                    <Briefcase size = {18}/>
                                    Learn more
                                </Button>
                            </Link>
                          </div>

                          {/* trust - indicator section  */}

                          <div className="flex items-center gap-2 text-sm opacity-60 pt-4">
                            <span>
                               ✔️ Free to use
                            </span>
                            <span>•</span>
                            <span>
                               ✔️ verified employers
                            </span>
                            <span>•</span>
                            <span>
                               ✔️ Secure platform
                            </span>
                          </div>
                </div>

                {/* image section */}


                <div className="flex-1 relative">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-blue-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity"> </div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                                <img src="/" className="object-cover object-center w-full h-full transform transition-transform duration-900 group-hover:scale-180" alt=""/>
                            </div>

                       
                    </div>
                </div>
            </div>
        </div>
      </section>
    )
}
export default Hero 
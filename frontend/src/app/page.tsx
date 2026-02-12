import CarrerGuide from "@/components/carrer-guide";
import Hero from "@/components/hero";
import ResumeAnalyzer from "@/components/resume-analyzer";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = ()=>{
  return <div> 
    
    <Hero/>
    <CarrerGuide/>
    <ResumeAnalyzer/>
  </div>
}

export default Home;
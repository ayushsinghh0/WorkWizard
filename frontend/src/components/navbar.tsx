"use client"
import Link from "next/link";
import React, { useState } from "react"
import { Button } from "./ui/button";
import { Briefcase, Home, Info, User } from "lucide-react";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export const NavBar = ()=>{
    const [isOpen,setIsOpen]=useState(false);





    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    }

    const isAuth = false;

    const logoutHandler = () =>{}
    return (
         <nav className="z-50 sticky top-0 bg-background/80 border-b backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 ">
                    <div className="flex items-center">
                        <Link href={"/"} className="flex items-center gap-1 group">
                             <div className="text-2xl font-bold tracking-tight">
                                <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    Hired </span>
                                <span className="text-red-500">
                                    Heaven
                                </span>
                               
                               </div>
                             </Link>
                           </div>
                        {/* Desktop Navigation */}
                         <div className="hidden md:flex items-center space-x-1">
                            <Link href={"/"} >
                                <Button variant={"ghost"} className="flex items-center gap-2 font medium"><Home size ={16}/>Home</Button>
                            </Link>
                            <Link href={"/jobs"} >
                                <Button variant={"ghost"} className="flex items-center gap-2 font medium"><Briefcase size ={16}/>Jobs</Button>
                            </Link>
                            <Link href={"/about"} >
                                <Button variant={"ghost"} className="flex items-center gap-2 font medium"><Info size ={16}/>About</Button>
                            </Link>
                    </div>

                    {/* Right side Actions main walaa */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuth ? <>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="flex items-center hover:opacity-80 transition-opacity">

                                                <Avatar className="h-9 w-9 ring-offset-2 ring-offset-background ring-blue-500/20 cursor-pointer hover:ring-blue-500/40 transition-all">
                                                   {/*  <AvatarImage src={} alt=""/> */}
                                                   <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600">
                                                    A
                                                   </AvatarFallback>
                                                </Avatar>
                                            </button>

                                        </PopoverTrigger>

                                        <Popover
                                    </Popover>
                                  </>: <Link href={"/login"}><Button className="gap-2"><User size={16}/>Sign in</Button></Link>}
                    </div>
                </div>
            </div>
        </nav>
    )}
                        




































    /* "use client";

import Link from "next/link";
import React, { useState } from "react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-50 sticky top-0 border-b backdrop-blur-md shadow-sm ">

      <div className="flex justify-between items-center h-16 px-4">

        <Link href="/" className="flex items-center gap-1">

          <div className="text-2xl font-bold tracking-tight">

            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Hired
              <span className="text-red-500">Heaven</span>
            </span>

          </div>

        </Link>

      </div>
    </nav>
  );
};
 */
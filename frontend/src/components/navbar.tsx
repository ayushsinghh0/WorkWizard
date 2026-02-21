"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Briefcase, Home, Info, LogOut, Menu, User, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./ui/mode-toggle";
import { useAppData } from "@/context/appContext";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, user, loading, logoutUser } = useAppData();

  const toggleMenu = () => setIsOpen(!isOpen);
  const logoutHandler = () => logoutUser();

  return (
    <nav className="z-50 sticky top-0 bg-background/85 border-b border-violet-100 dark:border-violet-900/40 backdrop-blur-md shadow-sm shadow-violet-100/50 dark:shadow-violet-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent group-hover:from-violet-600 group-hover:to-fuchsia-600 transition-all duration-300">
                Work{" "}
              </span>
              <span className="text-foreground">Wizard</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", icon: Home, label: "Home" },
              { href: "/jobs", icon: Briefcase, label: "Jobs" },
              { href: "/about", icon: Info, label: "About" },
            ].map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href}>
                <Button variant="ghost" className="flex items-center gap-2 font-medium hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors">
                  <Icon size={16} />
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? null : (
              <>
                {isAuth ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center hover:opacity-80 transition-opacity">
                        <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-offset-background ring-violet-500/40 cursor-pointer hover:ring-violet-500/70 transition-all">
                          <AvatarImage
                            src={user ? (user.profile_pic as string) : ""}
                            alt={user ? user.name : ""}
                          />
                          <AvatarFallback className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 font-bold">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2 border-violet-100 dark:border-violet-800" align="end">
                      <div className="px-3 py-2 mb-2 border-b border-violet-100 dark:border-violet-800">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs opacity-60 truncate">{user?.email}</p>
                      </div>
                      <Link href="/account">
                        <Button className="w-full justify-start gap-2 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40" variant="ghost">
                          <User size={16} /> My Profile
                        </Button>
                      </Link>
                      <Button
                        className="w-full justify-start gap-2 mt-1 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        variant="ghost"
                        onClick={logoutHandler}
                      >
                        <LogOut size={16} /> Log Out
                      </Button>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link href="/login">
                    <Button className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-sm shadow-violet-400/30 text-white border-0 transition-all duration-300">
                      <User size={16} />
                      Sign in
                    </Button>
                  </Link>
                )}
              </>
            )}
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden border-t border-violet-100 dark:border-violet-900/40 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-3 py-3 space-y-1 bg-background/95 backdrop-blur-md">
          {[
            { href: "/", icon: Home, label: "Home" },
            { href: "/jobs", icon: Briefcase, label: "Jobs" },
            { href: "/about", icon: Info, label: "About" },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-11 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40">
                <Icon size={18} /> {label}
              </Button>
            </Link>
          ))}

          {isAuth ? (
            <>
              <Link href="/account" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start gap-3 h-11 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40">
                  <User size={18} /> My Profile
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="w-full justify-start gap-3 h-11"
                onClick={() => { logoutHandler(); toggleMenu(); }}
              >
                <LogOut size={18} /> Log Out
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={toggleMenu}>
              <Button className="w-full justify-start gap-3 h-11 mt-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0">
                <User size={18} /> Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="sticky top-0 z-10 w-full bg-[#0b1120] border-b border-white/10 shadow-sm px-3 sm:px-6 md:px-10 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Fidelio
        </Link>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {session ? (
            <>
              <span className="text-sm sm:text-base text-gray-300">
                Welcome, <span className="font-semibold">{user.username || user.email}</span>
              </span>
              
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-white text-black hover:bg-gray-200 transition px-4 py-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

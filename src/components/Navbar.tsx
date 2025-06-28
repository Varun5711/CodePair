import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon, Sparkles, Zap } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";

function Navbar() {
  return (
    <>
      {/* Fixed glassmorphism navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-800/30 shadow-lg shadow-black/5">
        <div className="flex h-16 items-center px-4 container mx-auto">
          
          {/* LEFT SIDE - ENHANCED LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-3 font-bold text-2xl mr-8 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Glowing icon container */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
              
              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:rotate-6">
                <CodeIcon className="size-6 text-white drop-shadow-sm" />
                
                {/* Sparkle overlay */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <Sparkles className="size-3 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Logo text with animated gradient */}
            <div className="relative overflow-hidden">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent animate-pulse">
                CodePair
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out] transition-opacity duration-300"></div>
            </div>
            
            {/* Lightning bolt accent */}
            <Zap className="size-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 drop-shadow-sm" />
          </Link>



          {/* RIGHT SIDE - USER ACTIONS */}
          <SignedIn>
            <div className="flex items-center space-x-3 ml-auto">
              
              {/* Online status pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50/80 dark:bg-emerald-950/50 backdrop-blur-sm rounded-full border border-emerald-200/50 dark:border-emerald-800/30 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide">LIVE</span>
              </div>

              {/* Dashboard button with glow */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                <div className="relative">
                  <DasboardBtn />
                </div>
              </div>

              {/* Mode toggle with enhanced glow */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg opacity-0 group-hover:opacity-40 blur transition-all duration-300"></div>
                <div className="relative">
                  <ModeToggle />
                </div>
              </div>

              {/* User button - clean */}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent animate-pulse"></div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
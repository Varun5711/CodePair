"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import {
  Loader2Icon,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Star,
  ChevronRight,
  Video,
  MessageSquare,
  Award,
  Target,
  Zap,
  Activity,
} from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  // Get current time for dynamic greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20">
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* ENHANCED WELCOME SECTION */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/90 via-white/70 to-emerald-50/80 dark:from-gray-900/90 dark:via-gray-800/70 dark:to-emerald-950/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 p-8">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-4 flex-1">
              {/* Dynamic greeting */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/25">
                  <Activity className="size-6 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent leading-tight">
                    {getTimeBasedGreeting()}!
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    {isInterviewer
                      ? "Ready to discover exceptional talent today?"
                      : "Your next opportunity awaits"}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
                {isInterviewer
                  ? "Streamline your interview process, evaluate candidates with precision, and build amazing teams through data-driven insights."
                  : "Access your personalized interview dashboard, track your progress, and ace your upcoming interviews with confidence."}
              </p>

              {/* Quick stats pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100/80 dark:bg-emerald-900/30 backdrop-blur-sm rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
                  <Calendar className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    {interviews?.length || 0} Active
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  <Clock className="size-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {isInterviewer ? "Interviewer" : "Candidate"}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-purple-800/50">
                  <TrendingUp className="size-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                    Growing
                  </span>
                </div>
              </div>
            </div>

            {/* Side illustration */}
            <div className="hidden lg:block relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30 flex items-center justify-center">
                <Users className="size-16 text-emerald-600/70 dark:text-emerald-400/70" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full animate-pulse delay-500 shadow-lg shadow-emerald-400/50"></div>
            </div>
          </div>
        </div>

        {isInterviewer ? (
          <>
            {/* INTERVIEWER SECTION */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Zap className="size-6 text-emerald-500" />
                    Quick Actions
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Start managing interviews in seconds
                  </p>
                </div>

                <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 group">
                  View All
                  <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {QUICK_ACTIONS.map((action, index) => (
                  <div
                    key={action.title}
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ActionCard
                      action={action}
                      onClick={() => handleQuickAction(action.title)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />

            {/* INTERVIEWER INSIGHTS SECTION */}
            <div className="grid lg:grid-cols-3 gap-6 mt-12">
              {/* Recent Activity Feed */}
              <div className="lg:col-span-2 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-900/90 dark:to-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-900/5 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <Activity className="size-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Recent Activity
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Latest interview updates
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      action: "Completed interview with Sarah Chen",
                      time: "2 hours ago",
                      type: "success",
                      icon: Users,
                    },
                    {
                      action: "New interview scheduled for tomorrow",
                      time: "4 hours ago",
                      type: "info",
                      icon: Calendar,
                    },
                    {
                      action: "Candidate feedback submitted",
                      time: "6 hours ago",
                      type: "warning",
                      icon: MessageSquare,
                    },
                    {
                      action: "Interview room prepared",
                      time: "1 day ago",
                      type: "success",
                      icon: Video,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          item.type === "success"
                            ? "bg-emerald-100 dark:bg-emerald-900/30"
                            : item.type === "info"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : "bg-orange-100 dark:bg-orange-900/30"
                        }`}
                      >
                        <item.icon
                          className={`size-4 ${
                            item.type === "success"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : item.type === "info"
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-orange-600 dark:text-orange-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {item.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.time}
                        </p>
                      </div>
                      <ChevronRight className="size-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats & Tips Card */}
              <div className="space-y-6">
                {/* Performance Stats */}
                <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-emerald-200/30 dark:border-emerald-700/30 shadow-xl shadow-emerald-500/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                      <TrendingUp className="size-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      This Week
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Interviews Conducted
                      </span>
                      <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        12
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Avg. Rating
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-500 fill-current" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          4.8
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Response Time
                      </span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        1.2h
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-sm rounded-2xl border border-purple-200/30 dark:border-purple-700/30 shadow-xl shadow-purple-500/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Award className="size-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Pro Tip
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Start interviews with an icebreaker question to help
                      candidates feel comfortable and showcase their
                      personality.
                    </p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg shadow-purple-500/25">
                      More Tips
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* CANDIDATE SECTION */}
            <div className="space-y-8">
              {/* Header with enhanced styling */}
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Video className="size-8 text-emerald-500" />
                    Your Interview Journey
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Track your progress and prepare for success
                  </p>
                </div>

                {/* Action button */}
                <a
                  href="http://www.varunnn.tech/"
                  target="_blank"
                  className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
                >
                  <MessageSquare className="size-5" />
                  Get Help
                </a>
              </div>

              {/* Enhanced interviews section */}
              <div className="space-y-6">
                {interviews === undefined ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Loader2Icon className="h-8 w-8 animate-spin text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                    </div>
                    <p className="text-muted-foreground font-medium">
                      Loading your interviews...
                    </p>
                  </div>
                ) : interviews.length > 0 ? (
                  <>
                    {/* Interview stats */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/30">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <Calendar className="size-5 text-white" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                              {interviews.length}
                            </p>
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                              Scheduled
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/30">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-500 rounded-lg">
                            <Target className="size-5 text-white" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                              {
                                interviews.filter(
                                  (i:any) => new Date(i._creationTime) > new Date()
                                ).length
                              }
                            </p>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                              Upcoming
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/30">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500 rounded-lg">
                            <Award className="size-5 text-white" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                              A+
                            </p>
                            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                              Readiness
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interviews grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {interviews.map((interview:any, index:any) => (
                        <div
                          key={interview._id}
                          className="transform transition-all duration-300 hover:scale-105"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <MeetingCard interview={interview} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 space-y-6">
                    <div className="relative mx-auto w-24 h-24">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <Calendar className="size-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Star className="size-4 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Your interview journey starts here
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        No interviews scheduled yet. When you get invited to
                        interviews, they'll appear here ready for you to join.
                      </p>
                    </div>

                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300">
                      <MessageSquare className="size-5" />
                      Get Interview Tips
                    </button>
                  </div>
                )}

                {/* CANDIDATE RESOURCES SECTION */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  {/* Preparation Resources */}
                  <div className="bg-gradient-to-br from-white/90 to-blue-50/80 dark:from-gray-900/90 dark:to-blue-950/40 backdrop-blur-sm rounded-2xl border border-blue-200/30 dark:border-blue-700/30 shadow-xl shadow-blue-500/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                        <Target className="size-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Interview Prep
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Ace your next interview
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: "Common Questions",
                          desc: "Practice 50+ frequently asked questions",
                          progress: 75,
                          color: "blue",
                        },
                        {
                          title: "Technical Skills",
                          desc: "Coding challenges and system design",
                          progress: 60,
                          color: "emerald",
                        },
                        {
                          title: "Behavioral Prep",
                          desc: "STAR method and storytelling",
                          progress: 90,
                          color: "purple",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h4>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {item.progress}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.desc}
                          </p>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                item.color === "blue"
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                  : item.color === "emerald"
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                              }`}
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}

                      <a
                        href="https://leetcode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-500/25 text-center block"
                      >
                        Start Learning
                      </a>
                    </div>
                  </div>

                  {/* Success Stories & Motivation */}
                  <div className="bg-gradient-to-br from-white/90 to-emerald-50/80 dark:from-gray-900/90 dark:to-emerald-950/40 backdrop-blur-sm rounded-2xl border border-emerald-200/30 dark:border-emerald-700/30 shadow-xl shadow-emerald-500/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                        <Award className="size-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Success Stories
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Get inspired by others
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <div className="p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              A
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                "CodePair helped me prepare thoroughly. I landed
                                my dream job at a top tech company!"
                              </p>
                              <div className="flex items-center gap-2 mt-3">
                                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                  Alex Chen
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  • Software Engineer at Google
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/20 dark:border-gray-700/20">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            2.5k+
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">
                            Success Stories
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/20 dark:border-gray-700/20">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            94%
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">
                            Success Rate
                          </div>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg shadow-emerald-500/25">
                        Read More Stories
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

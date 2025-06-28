import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Camera, Mic, Settings, Video, VideoOff, MicOff } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import PageWrapper from "./PageWrapper";

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);

  const call = useCall();

  if (!call) return null;

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call.microphone]);

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Ready to Join?
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Set up your camera and microphone before joining the meeting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* VIDEO PREVIEW CONTAINER */}
          <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-0 shadow-lg bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  {isCameraDisabled ? (
                    <VideoOff className="h-6 w-6 text-white" />
                  ) : (
                    <Video className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Camera Preview</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Make sure you look great!</p>
                </div>
              </div>

              {/* VIDEO PREVIEW */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border shadow-inner min-h-[320px] sm:min-h-[400px]">
                <div className="absolute inset-0">
                  <VideoPreview className="h-full w-full object-cover" />
                </div>
                {isCameraDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 dark:bg-slate-900/30 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                        <VideoOff className="h-8 w-8 text-slate-500 dark:text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Camera is off</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* CONTROLS CARD */}
          <Card className="group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border-0 shadow-lg bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="p-6 sm:p-8 h-full flex flex-col">
              {/* MEETING DETAILS */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Meeting Details</h2>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 border">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium mb-1">Meeting ID</p>
                  <p className="font-mono text-sm text-slate-900 dark:text-white break-all">{call.id}</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* CAMERA CONTROL */}
                  <div className="group/control p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200 ${
                          isCameraDisabled 
                            ? 'bg-red-100 dark:bg-red-900/30' 
                            : 'bg-green-100 dark:bg-green-900/30'
                        }`}>
                          <Camera className={`h-6 w-6 ${
                            isCameraDisabled 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-green-600 dark:text-green-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Camera</p>
                          <p className={`text-sm font-medium ${
                            isCameraDisabled 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-green-600 dark:text-green-400'
                          }`}>
                            {isCameraDisabled ? "Disabled" : "Enabled"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={!isCameraDisabled}
                        onCheckedChange={(checked) => setIsCameraDisabled(!checked)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  </div>

                  {/* MICROPHONE CONTROL */}
                  <div className="group/control p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200 ${
                          isMicDisabled 
                            ? 'bg-red-100 dark:bg-red-900/30' 
                            : 'bg-green-100 dark:bg-green-900/30'
                        }`}>
                          {isMicDisabled ? (
                            <MicOff className="h-6 w-6 text-red-600 dark:text-red-400" />
                          ) : (
                            <Mic className="h-6 w-6 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Microphone</p>
                          <p className={`text-sm font-medium ${
                            isMicDisabled 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-green-600 dark:text-green-400'
                          }`}>
                            {isMicDisabled ? "Muted" : "Unmuted"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={!isMicDisabled}
                        onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  </div>

                  {/* DEVICE SETTINGS */}
                  <div className="group/control p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
                          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Device Settings</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Configure audio & video</p>
                        </div>
                      </div>
                      <DeviceSettings />
                    </div>
                  </div>
                </div>

                {/* JOIN BUTTON */}
                <div className="space-y-4 mt-8">
                  <Button 
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" 
                    size="lg" 
                    onClick={handleJoin}
                  >
                    🚀 Join Meeting
                  </Button>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200/50 dark:border-green-800/50">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-medium">Ready to connect?</span> Our team is excited to meet you! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </PageWrapper>
  );
}

export default MeetingSetup;
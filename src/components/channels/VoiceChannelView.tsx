"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Volume2, Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Users, ScreenShare } from "lucide-react"
import { useState } from "react"

export function VoiceChannelView() {
  const { state } = useDiscord()
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  if (!state.selectedServer || !state.selectedChannel) return null

  const connectedUsers = state.selectedServer.members.slice(0, 3) // Mock connected users

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Voice Channel Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-3">
          <Volume2 className="w-6 h-6 text-[#72767d]" />
          <span className="text-white font-semibold">{state.selectedChannel.name}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-[#43b581] rounded-full" />
            <span className="text-[#43b581] text-sm">{connectedUsers.length} connected</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Users className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Voice Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <Volume2 className="w-16 h-16 text-[#72767d] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#ffffff] mb-2">Voice Connected</h2>
          <p className="text-[#b9bbbe]">You're connected to {state.selectedChannel.name}</p>
        </div>

        {/* Connected Users */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {connectedUsers.map((user) => (
            <div key={user.id} className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-20 h-20 rounded-full bg-[#5865f2] flex items-center justify-center">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.displayName}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#43b581] rounded-full flex items-center justify-center">
                  <Mic className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-[#ffffff] text-sm font-medium">{user.displayName}</span>
            </div>
          ))}
        </div>

        {/* Screen Share Area */}
        {isScreenSharing && (
          <div className="w-full max-w-4xl bg-[#2f3136] rounded-lg p-4 mb-8">
            <div className="aspect-video bg-[#202225] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ScreenShare className="w-12 h-12 text-[#72767d] mx-auto mb-2" />
                <p className="text-[#b9bbbe]">Screen sharing active</p>
              </div>
            </div>
          </div>
        )}

        {/* Voice Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${
              isMuted ? "bg-[#f04747] hover:bg-[#d73527]" : "bg-[#4f545c] hover:bg-[#5d6269]"
            } text-white`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${
              isDeafened ? "bg-[#f04747] hover:bg-[#d73527]" : "bg-[#4f545c] hover:bg-[#5d6269]"
            } text-white`}
            onClick={() => setIsDeafened(!isDeafened)}
          >
            <Volume2 className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${
              isVideoOn ? "bg-[#43b581] hover:bg-[#3ca374]" : "bg-[#4f545c] hover:bg-[#5d6269]"
            } text-white`}
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${
              isScreenSharing ? "bg-[#43b581] hover:bg-[#3ca374]" : "bg-[#4f545c] hover:bg-[#5d6269]"
            } text-white`}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            <ScreenShare className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-[#f04747] hover:bg-[#d73527] text-white"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

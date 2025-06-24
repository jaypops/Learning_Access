"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Hand, Users, Settings, Volume2 } from "lucide-react"
import { useState } from "react"

export function StageChannelView() {
  const { state } = useDiscord()
  const [isRequestingToSpeak, setIsRequestingToSpeak] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(false)

  if (!state.selectedServer || !state.selectedChannel) return null

  const speakers = state.selectedServer.members.slice(0, 2)
  const audience = state.selectedServer.members.slice(2, 5)

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Stage Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-[#5865f2] rounded-full flex items-center justify-center">
            <Mic className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold">{state.selectedChannel.name}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-[#43b581] rounded-full" />
            <span className="text-[#43b581] text-sm">Live</span>
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

      {/* Stage Content */}
      <div className="flex-1 p-6">
        {/* Stage Area */}
        <div className="bg-[#2f3136] rounded-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#ffffff] mb-2">Welcome to the Stage</h2>
            <p className="text-[#b9bbbe]">Join the conversation or listen in</p>
          </div>

          {/* Speakers */}
          <div className="mb-8">
            <h3 className="text-[#ffffff] font-semibold mb-4 flex items-center">
              <Mic className="w-4 h-4 mr-2" />
              Speakers ({speakers.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="w-16 h-16 rounded-full bg-[#5865f2] flex items-center justify-center">
                      <img
                        src={speaker.avatar || "/placeholder.svg"}
                        alt={speaker.displayName}
                        className="w-14 h-14 rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#43b581] rounded-full flex items-center justify-center">
                      <Mic className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <span className="text-[#ffffff] text-sm font-medium text-center">{speaker.displayName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audience */}
          <div>
            <h3 className="text-[#ffffff] font-semibold mb-4 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Audience ({audience.length})
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {audience.map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#40444b] flex items-center justify-center mb-1">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <span className="text-[#b9bbbe] text-xs text-center truncate w-full">{member.displayName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Controls */}
        <div className="flex items-center justify-center space-x-4">
          {!isSpeaker ? (
            <Button
              className={`${
                isRequestingToSpeak ? "bg-[#faa61a] hover:bg-[#f39c12]" : "bg-[#5865f2] hover:bg-[#4752c4]"
              } text-white`}
              onClick={() => setIsRequestingToSpeak(!isRequestingToSpeak)}
            >
              <Hand className="w-4 h-4 mr-2" />
              {isRequestingToSpeak ? "Cancel Request" : "Request to Speak"}
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-[#4f545c] hover:bg-[#5d6269] text-white"
              >
                <Mic className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-[#f04747] hover:bg-[#d73527] text-white"
                onClick={() => setIsSpeaker(false)}
              >
                <MicOff className="w-6 h-6" />
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-[#4f545c] hover:bg-[#5d6269] text-white"
          >
            <Volume2 className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

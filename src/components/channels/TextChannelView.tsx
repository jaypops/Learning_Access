"use client"

import type React from "react"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hash, Users, Pin, Bell, AtSign, MoreHorizontal, Plus, Gift, Sticker, Smile } from "lucide-react"
import { useState } from "react"

export function TextChannelView() {
  const { state, dispatch } = useDiscord()
  const [message, setMessage] = useState("")

  if (!state.selectedServer || !state.selectedChannel) return null

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !state.currentUser) return

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      author: state.currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    dispatch({ type: "ADD_MESSAGE", payload: newMessage })
    setMessage("")
  }

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Channel Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-3">
          <Hash className="w-6 h-6 text-[#72767d]" />
          <span className="text-white font-semibold">{state.selectedChannel.name}</span>
          {state.selectedChannel.topic && (
            <>
              <div className="w-px h-6 bg-[#40444b]" />
              <span className="text-[#72767d] text-sm">{state.selectedChannel.topic}</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Pin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Users className="w-5 h-5" />
          </Button>
          <div className="w-px h-6 bg-[#40444b]" />
          <Input
            placeholder="Search"
            className="w-36 h-6 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] text-sm"
          />
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <AtSign className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4  overflow-y-auto">
          {/* Welcome Message */}
          <div className="text-center py-8 mb-45">
            <div className="w-16 h-16 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto">
              <Hash className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#ffffff] mb-2">Welcome to #{state.selectedChannel.name}!</h2>
            <p className="text-[#b9bbbe]">This is the start of the #{state.selectedChannel.name} channel.</p>
          </div>

          {/* Messages */}
          {state.messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-start space-x-3 mb-4 hover:bg-[#32353b] -mx-4 px-4 py-1 rounded group"
            >
              <img
                src={msg.author.avatar || "/placeholder.svg"}
                alt={msg.author.displayName}
                className="w-10 h-10 rounded-full mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[#ffffff] font-medium">{msg.author.displayName}</span>
                  <span className="text-[#72767d] text-xs">{msg.timestamp}</span>
                </div>
                <p className="text-[#dcddde]">{msg.content}</p>
                {msg.reactions && (
                  <div className="flex items-center space-x-1 mt-2">
                    {msg.reactions.map((reaction, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 bg-[#2f3136] hover:bg-[#393c43] text-[#dcddde] text-xs"
                      >
                        {reaction.emoji} {reaction.count}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4">
          <form onSubmit={handleSendMessage}>
            <div className="bg-[#40444b] rounded-lg px-4 py-3 flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
                <Plus className="w-5 h-5" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${state.selectedChannel.name}`}
                className="flex-1 bg-transparent border-none text-[#dcddde] placeholder:text-[#72767d] focus:ring-0"
              />
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
                  <Gift className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
                  <Sticker className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
                  <Smile className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

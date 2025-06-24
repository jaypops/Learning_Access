"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hash, Volume2, Plus, Settings, UserPlus, ChevronDown, MicOff, HeadphonesIcon, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ChannelSidebar() {
  const { state, dispatch } = useDiscord()

  if (!state.currentUser) return null

  if (state.currentView === "friends" || state.currentView === "shop") {
    return (
      <div className="hidden md:flex w-60 bg-[#2f3136] flex-col">
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#36393f] rounded-full flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-[#b9bbbe]" />
            </div>
            <span className="text-white font-semibold">Friends</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-2">
          <Input
            placeholder="Find or start a conversation"
            className="bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] h-7 text-sm"
          />
        </div>

        {/* Navigation */}
        <div className="px-2 space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-8 px-2 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde]",
              state.currentView === "friends" && "bg-[#393c43] text-[#dcddde]",
            )}
            onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "friends" })}
          >
            <UserPlus className="w-4 h-4 mr-3" />
            Friends
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-8 px-2 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde]",
              state.currentView === "shop" && "bg-[#393c43] text-[#dcddde]",
            )}
            onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "shop" })}
          >
            <ShoppingBag className="w-4 h-4 mr-3" />
            Shop
          </Button>
        </div>

        {/* Direct Messages */}
        <div className="flex-1 px-2 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#96989d] text-xs font-semibold uppercase tracking-wide">Direct Messages</span>
            <Button variant="ghost" size="icon" className="w-4 h-4 text-[#96989d] hover:text-[#dcddde]">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {state.friends.map((friend) => (
            <Button
              key={friend.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-8 px-2 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde] mb-1",
                state.selectedFriend?.id === friend.id && "bg-[#393c43] text-[#dcddde]",
              )}
              onClick={() => dispatch({ type: "SELECT_FRIEND", payload: friend })}
            >
              <div className="relative mr-3">
                <img
                  src={friend.avatar || "/placeholder.svg"}
                  alt={friend.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <div
                  className={cn(
                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#2f3136]",
                    friend.isOnline ? "bg-[#43b581]" : "bg-[#747f8d]",
                  )}
                />
              </div>
              <span className="truncate">{friend.displayName}</span>
            </Button>
          ))}
        </div>

        {/* User Panel */}
        <div className="h-[52px] bg-[#292b2f] px-2 flex items-center">
          <div className="flex items-center flex-1">
            <div className="relative mr-2">
              <img
                src={state.currentUser.avatar || "/placeholder.svg"}
                alt={state.currentUser.displayName}
                className="w-8 h-8 rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#43b581] rounded-full border-2 border-[#292b2f]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#ffffff] text-sm font-medium truncate">{state.currentUser.displayName}</div>
              <div className="text-[#b9bbbe] text-xs truncate">{state.currentUser.username}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
              <MicOff className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
              <HeadphonesIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]"
              onClick={() => dispatch({ type: "TOGGLE_SETTINGS" })}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if ((state.currentView === "server" || state.currentView === "server-boosts") && state.selectedServer) {
    return (
      <div className="hidden md:flex w-60 bg-[#2f3136] flex-col">
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] shadow-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex-1 justify-between text-white font-semibold hover:bg-[#393c43] h-8"
              >
                {state.selectedServer.name}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#18191c] border-[#202225]">
              <DropdownMenuItem className="text-[#dcddde] hover:bg-[#393c43]">Server Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-[#dcddde] hover:bg-[#393c43]">Create Channel</DropdownMenuItem>
              <DropdownMenuItem
                className="text-[#dcddde] hover:bg-[#393c43]"
                onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "server-boosts" })}
              >
                Server Boost
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Server Boosts Navigation */}
        {state.currentView === "server-boosts" && (
          <div className="px-2 py-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-[#dcddde] bg-[#393c43] hover:bg-[#393c43]"
            >
              <div className="w-4 h-4 mr-3 bg-[#f47fff] rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm" />
              </div>
              Server Boosts
            </Button>
          </div>
        )}

        {/* Channels */}
        {state.currentView === "server" && (
          <div className="flex-1 px-2 py-2">
            {/* Text Channels */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1 px-2">
                <span className="text-[#96989d] text-xs font-semibold uppercase tracking-wide">Text Channels</span>
                <Button variant="ghost" size="icon" className="w-4 h-4 text-[#96989d] hover:text-[#dcddde]">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {state.selectedServer.channels
                .filter((channel) => channel.type === "text")
                .map((channel) => (
                  <Button
                    key={channel.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-8 px-2 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde] mb-1",
                      state.selectedChannel?.id === channel.id && "bg-[#393c43] text-[#dcddde]",
                    )}
                    onClick={() => dispatch({ type: "SELECT_CHANNEL", payload: channel })}
                  >
                    <Hash className="w-4 h-4 mr-3" />
                    {channel.name}
                  </Button>
                ))}
            </div>

            {/* Voice Channels */}
            <div>
              <div className="flex items-center justify-between mb-1 px-2">
                <span className="text-[#96989d] text-xs font-semibold uppercase tracking-wide">Voice Channels</span>
                <Button variant="ghost" size="icon" className="w-4 h-4 text-[#96989d] hover:text-[#dcddde]">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {state.selectedServer.channels
                .filter((channel) => channel.type === "voice")
                .map((channel) => (
                  <Button
                    key={channel.id}
                    variant="ghost"
                    className="w-full justify-start h-8 px-2 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde] mb-1"
                  >
                    <Volume2 className="w-4 h-4 mr-3" />
                    {channel.name}
                  </Button>
                ))}
            </div>

            {/* Events */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1 px-2">
                <span className="text-[#96989d] text-xs font-semibold uppercase tracking-wide">Events</span>
                <Button variant="ghost" size="icon" className="w-4 h-4 text-[#96989d] hover:text-[#dcddde]">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center py-4">
                <div className="text-[#72767d] text-sm">No events scheduled</div>
              </div>
            </div>

            {/* Server Boosts */}
            <div>
              <div className="flex items-center justify-between mb-1 px-2">
                <span className="text-[#96989d] text-xs font-semibold uppercase tracking-wide">Server Boosts</span>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde] mb-1"
                onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "server-boosts" })}
              >
                <div className="w-4 h-4 mr-3 bg-gradient-to-r from-[#f47fff] to-[#e06bef] rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm" />
                </div>
                Server Boosts
              </Button>
            </div>
          </div>
        )}

        {/* User Panel */}
        <div className="h-[52px] bg-[#292b2f] px-2 flex items-center">
          <div className="flex items-center flex-1">
            <div className="relative mr-2">
              <img
                src={state.currentUser.avatar || "/placeholder.svg"}
                alt={state.currentUser.displayName}
                className="w-8 h-8 rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#43b581] rounded-full border-2 border-[#292b2f]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#ffffff] text-sm font-medium truncate">{state.currentUser.displayName}</div>
              <div className="text-[#b9bbbe] text-xs truncate">{state.currentUser.username}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
              <MicOff className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
              <HeadphonesIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]"
              onClick={() => dispatch({ type: "TOGGLE_SETTINGS" })}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

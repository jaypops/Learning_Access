"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Menu, UserPlus, HelpCircle, Users } from "lucide-react"

export function MobileHeader() {
  const { state, dispatch } = useDiscord()

  if (!state.currentUser) return null

  const onlineFriends = state.friends.filter((f) => f.isOnline).length
  const totalFriends = state.friends.length

  return (
    <div className="md:hidden">
      {/* Discord Header */}
      <div className="h-12 bg-[#36393f] border-b border-[#202225] px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#b9bbbe] hover:text-[#dcddde] mr-2"
            onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <UserPlus className="w-5 h-5 text-[#b9bbbe]" />
          <span className="text-white font-semibold">Friends</span>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde] relative">
            <Users className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f04747] rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Friends Navigation */}
      <div className="bg-[#36393f] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-[#b9bbbe]" />
          <span className="text-white font-medium">Friends</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className={`px-3 py-1.5 rounded text-sm ${
              state.currentFriendsTab === "online" ? "bg-[#40444b] text-white" : "text-[#b9bbbe] hover:text-[#dcddde]"
            }`}
            onClick={() => dispatch({ type: "SET_FRIENDS_TAB", payload: "online" })}
          >
            Online — {onlineFriends}
          </Button>
          <Button
            variant="ghost"
            className={`px-3 py-1.5 rounded text-sm ${
              state.currentFriendsTab === "all" ? "bg-[#40444b] text-white" : "text-[#b9bbbe] hover:text-[#dcddde]"
            }`}
            onClick={() => dispatch({ type: "SET_FRIENDS_TAB", payload: "all" })}
          >
            All — {totalFriends}
          </Button>
          <Button
            variant="ghost"
            className="px-3 py-1.5 rounded text-sm bg-[#5865f2] text-white hover:bg-[#4752c4]"
            onClick={() => dispatch({ type: "TOGGLE_ADD_FRIEND" })}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

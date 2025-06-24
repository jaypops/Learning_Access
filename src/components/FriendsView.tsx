"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UserPlus,
  Search,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Video,
  Pin,
  Users,
  AtSign,
  Gift,
  Sticker,
  Smile,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function FriendsView() {
  const { state, dispatch } = useDiscord()

  if (state.selectedFriend) {
    return (
      <div className="flex-1 flex flex-col bg-[#36393f] h-full overflow-hidden">
        {/* Chat Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={state.selectedFriend.avatar || "/placeholder.svg"}
                alt={state.selectedFriend.displayName}
                className="w-6 h-6 rounded-full"
              />
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#36393f]",
                  state.selectedFriend.isOnline ? "bg-[#43b581]" : "bg-[#747f8d]",
                )}
              />
            </div>
            <span className="text-white font-semibold">{state.selectedFriend.displayName}</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
              <Video className="w-5 h-5" />
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
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-x-auto">
            <div className="flex-1 p-4 overflow-y-auto min-w-[320px]">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#5865f2] to-[#3b82f6] rounded-full flex items-center justify-center">
                    <img
                      src={state.selectedFriend.avatar || "/placeholder.svg"}
                      alt={state.selectedFriend.displayName}
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                </div>
                <h2 className="text-[#ffffff] text-2xl font-bold text-center mb-2">
                  {state.selectedFriend.displayName}
                </h2>
                <p className="text-[#b9bbbe] text-center mb-4">{state.selectedFriend.username}</p>
                <p className="text-[#b9bbbe] text-center text-sm mb-4">
                  This is the beginning of your direct message history with{" "}
                  <span className="font-semibold">{state.selectedFriend.displayName}</span>.
                </p>
                <div className="flex justify-center space-x-2 mb-6">
                  <Button variant="discord-secondary" size="sm">
                    No servers in common
                  </Button>
                  <Button variant="discord-secondary" size="sm">
                    Remove Friend
                  </Button>
                  <Button variant="discord-secondary" size="sm">
                    Block
                  </Button>
                </div>
                <div className="text-center text-[#72767d] text-sm mb-4">June 21, 2025</div>
              </div>

              {/* Messages */}
              {state.messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start space-x-3 mb-4 hover:bg-[#32353b] -mx-4 px-4 py-1 rounded"
                >
                  <img
                    src={message.author.avatar || "/placeholder.svg"}
                    alt={message.author.displayName}
                    className="w-10 h-10 rounded-full mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[#ffffff] font-medium">{message.author.displayName}</span>
                      <span className="text-[#72767d] text-xs">{message.timestamp}</span>
                    </div>
                    <p className="text-[#dcddde]">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Wave Message */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">👋</div>
                <span className="text-[#b9bbbe] text-sm">
                  Wave to <span className="font-semibold">{state.selectedFriend.displayName}</span>
                </span>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 flex-shrink-0 min-w-[320px]">
              <div className="bg-[#40444b] rounded-lg px-4 py-3 flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde] flex-shrink-0">
                  <Plus className="w-5 h-5" />
                </Button>
                <Input
                  placeholder={`Message @${state.selectedFriend.displayName}`}
                  className="flex-1 bg-transparent border-none text-[#dcddde] placeholder:text-[#72767d] focus:ring-0"
                />
                <div className="flex items-center space-x-2 flex-shrink-0">
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
            </div>
          </div>

          {/* User Profile Sidebar - Hidden on mobile */}
          <div className="hidden xl:block w-80 bg-[#2f3136] border-l border-[#202225] p-4 flex-shrink-0">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#5865f2] to-[#3b82f6] rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src={state.selectedFriend.avatar || "/placeholder.svg"}
                  alt={state.selectedFriend.displayName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <h3 className="text-[#ffffff] text-xl font-bold mb-1">{state.selectedFriend.displayName}</h3>
              <p className="text-[#b9bbbe] text-sm mb-4">{state.selectedFriend.username}</p>
              <div className="space-y-2">
                <Button variant="discord" className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Friend
                </Button>
                <Button variant="ghost" className="w-full text-[#b9bbbe] hover:text-[#dcddde]">
                  <MoreHorizontal className="w-4 h-4 mr-2" />
                  More
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[#ffffff] font-semibold mb-2">Member Since</h4>
                <p className="text-[#b9bbbe] text-sm">{state.selectedFriend.memberSince}</p>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="ghost" className="w-full justify-start text-[#b9bbbe] hover:text-[#dcddde]">
                View Full Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onlineFriends = state.friends.filter((f) => f.isOnline).length
  const totalFriends = state.friends.length

  return (
    <div className="flex-1 flex flex-col bg-[#36393f] h-full overflow-hidden">
      {/* Friends Header - Hidden on mobile */}
      <div className="hidden md:flex h-12 px-4 items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-[#b9bbbe]" />
            <span className="text-white font-semibold">Friends</span>
          </div>
          <div className="h-6 w-px bg-[#40444b]" />
          <Tabs value={state.currentFriendsTab} className="flex items-center">
            <TabsList className="bg-transparent p-0 h-auto space-x-4">
              <TabsTrigger
                value="online"
                className={cn(
                  "bg-transparent px-2 py-1 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:bg-[#393c43] data-[state=active]:text-white rounded",
                  state.currentFriendsTab === "online" && "bg-[#393c43] text-white",
                )}
                onClick={() => dispatch({ type: "SET_FRIENDS_TAB", payload: "online" })}
              >
                Online — {onlineFriends}
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className={cn(
                  "bg-transparent px-2 py-1 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:bg-[#393c43] data-[state=active]:text-white rounded",
                  state.currentFriendsTab === "all" && "bg-[#393c43] text-white",
                )}
                onClick={() => dispatch({ type: "SET_FRIENDS_TAB", payload: "all" })}
              >
                All — {totalFriends}
              </TabsTrigger>
              <TabsTrigger
                value="add-friend"
                className="bg-[#43b581] text-white px-3 py-1 rounded hover:bg-[#3ca374]"
                onClick={() => dispatch({ type: "TOGGLE_ADD_FRIEND" })}
              >
                Add Friend
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:block p-4 border-b border-[#202225]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#72767d]" />
          <Input
            placeholder="Search"
            className="pl-10 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] h-8"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 p-4 overflow-y-auto overflow-x-auto min-w-[320px]">
        <div className="mb-4">
          <h3 className="text-[#96989d] text-xs font-semibold uppercase tracking-wide mb-2">
            {state.currentFriendsTab === "online" ? `Online — ${onlineFriends}` : `All friends — ${totalFriends}`}
          </h3>
        </div>

        <div className="space-y-2">
          {state.friends
            .filter((friend) => state.currentFriendsTab === "all" || friend.isOnline)
            .map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-2 rounded hover:bg-[#32353b] cursor-pointer"
                onClick={() => dispatch({ type: "SELECT_FRIEND", payload: friend })}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={friend.avatar || "/placeholder.svg"}
                      alt={friend.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#36393f]",
                        friend.isOnline ? "bg-[#43b581]" : "bg-[#747f8d]",
                      )}
                    />
                  </div>
                  <div>
                    <div className="text-[#ffffff] font-medium">{friend.displayName}</div>
                    <div className="text-[#b9bbbe] text-sm">{friend.isOnline ? "Online" : "Offline"}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Active Now Sidebar - Hidden on mobile */}
      <div className="hidden xl:block w-80 bg-[#2f3136] border-l border-[#202225] p-4 flex-shrink-0">
        <h3 className="text-[#ffffff] font-semibold mb-4">Active Now</h3>
        <div className="text-center py-8">
          <div className="text-[#b9bbbe] text-sm mb-2">It's quiet for now...</div>
          <div className="text-[#72767d] text-xs">
            When a friend starts an activity—like playing a game or hanging out on voice—we'll show it here!
          </div>
        </div>
      </div>
    </div>
  )
}

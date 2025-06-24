"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Badge, MessageCircle, UserPlus, MoreHorizontal, Crown, Shield, Star } from "lucide-react"

export function UserProfileView() {
  const { state } = useDiscord()

  if (!state.selectedFriend && !state.currentUser) return null

  const user = state.selectedFriend || state.currentUser!

  return (
    <div className="flex-1 bg-[#36393f] overflow-y-auto">
      {/* Profile Banner */}
      <div className="h-60 bg-gradient-to-r from-[#5865f2] to-[#3b82f6] relative">
        {user.banner && (
          <img src={user.banner || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Profile Header */}
        <div className="flex items-end justify-between -mt-16 mb-6">
          <div className="flex items-end space-x-4">
            <div className="w-32 h-32 rounded-full border-8 border-[#36393f] bg-gradient-to-br from-[#5865f2] to-[#3b82f6] flex items-center justify-center">
              <img src={user.avatar || "/placeholder.svg"} alt={user.displayName} className="w-28 h-28 rounded-full" />
            </div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-[#ffffff] mb-1">{user.displayName}</h1>
              <p className="text-[#b9bbbe] text-lg">{user.username}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    user.status === "online"
                      ? "bg-[#43b581]"
                      : user.status === "away"
                        ? "bg-[#faa61a]"
                        : user.status === "dnd"
                          ? "bg-[#f04747]"
                          : "bg-[#747f8d]"
                  }`}
                />
                <span className="text-[#b9bbbe] capitalize">{user.status}</span>
              </div>
            </div>
          </div>

          {state.selectedFriend && (
            <div className="flex items-center space-x-2 mb-4">
              <Button variant="discord" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="discord-secondary" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Friend
              </Button>
              <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            {user.bio && (
              <div className="bg-[#2f3136] rounded-lg p-4">
                <h3 className="text-[#ffffff] font-semibold mb-3">About Me</h3>
                <p className="text-[#dcddde]">{user.bio}</p>
              </div>
            )}

            {/* Badges */}
            {user.badges && user.badges.length > 0 && (
              <div className="bg-[#2f3136] rounded-lg p-4">
                <h3 className="text-[#ffffff] font-semibold mb-3">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center space-x-2 bg-[#5865f2] text-white px-3 py-1 rounded-full text-sm"
                    >
                      {badge === "Early Supporter" && <Star className="w-4 h-4" />}
                      {badge === "Nitro" && <Crown className="w-4 h-4" />}
                      {badge === "Admin" && <Shield className="w-4 h-4" />}
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mutual Servers */}
            <div className="bg-[#2f3136] rounded-lg p-4">
              <h3 className="text-[#ffffff] font-semibold mb-3">Mutual Servers</h3>
              <div className="space-y-2">
                {state.servers.map((server) => (
                  <div key={server.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center text-white font-semibold">
                      {server.icon}
                    </div>
                    <div>
                      <div className="text-[#ffffff] font-medium">{server.name}</div>
                      <div className="text-[#b9bbbe] text-sm">{server.members.length} members</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Member Since */}
            <div className="bg-[#2f3136] rounded-lg p-4">
              <h3 className="text-[#ffffff] font-semibold mb-3">Member Since</h3>
              <div className="flex items-center space-x-2">
                <Badge className="w-4 h-4 text-[#b9bbbe]" />
                <span className="text-[#dcddde]">{user.memberSince}</span>
              </div>
            </div>

            {/* Note */}
            {state.selectedFriend && (
              <div className="bg-[#2f3136] rounded-lg p-4">
                <h3 className="text-[#ffffff] font-semibold mb-3">Note</h3>
                <textarea
                  placeholder="Click to add a note"
                  className="w-full bg-[#40444b] border-none text-[#dcddde] placeholder:text-[#72767d] rounded p-2 resize-none h-20"
                />
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-[#2f3136] rounded-lg p-4">
              <h3 className="text-[#ffffff] font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-[#dcddde] hover:bg-[#393c43]">
                  View Full Profile
                </Button>
                {state.selectedFriend && (
                  <>
                    <Button variant="ghost" className="w-full justify-start text-[#dcddde] hover:bg-[#393c43]">
                      Block User
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-[#f04747] hover:bg-[#393c43]">
                      Remove Friend
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

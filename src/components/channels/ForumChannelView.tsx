"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Plus, Search, Pin, Users, MoreHorizontal, ThumbsUp, MessageCircle } from "lucide-react"

export function ForumChannelView() {
  const { state } = useDiscord()

  if (!state.selectedServer || !state.selectedChannel) return null

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Forum Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-[#72767d]" />
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
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Forum Content */}
      <div className="flex-1 p-4">
        {/* Create Post Button */}
        <div className="mb-6">
          <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#72767d]" />
            <Input
              placeholder="Search posts..."
              className="pl-10 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] h-10"
            />
          </div>
          <Button variant="ghost" className="text-[#b9bbbe] hover:text-[#dcddde]">
            Latest Activity
          </Button>
        </div>

        {/* Forum Posts */}
        <div className="space-y-4">
          {state.forumPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#2f3136] rounded-lg p-4 hover:bg-[#32353b] cursor-pointer transition-colors"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-[#ffffff] font-semibold">{post.title}</h3>
                    <div className="flex items-center space-x-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[#5865f2] text-white text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#b9bbbe] text-sm mb-3">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-[#72767d] text-sm">
                      <span>by {post.author.displayName}</span>
                      <span>{post.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-[#72767d] text-sm">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-[#72767d] text-sm">
                        <ThumbsUp className="w-4 h-4" />
                        <span>5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

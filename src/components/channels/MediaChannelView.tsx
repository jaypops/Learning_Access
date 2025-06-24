"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, Video, Upload, Grid3X3, List, Filter } from "lucide-react"
import { useState } from "react"

export function MediaChannelView() {
  const { state } = useDiscord()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (!state.selectedServer || !state.selectedChannel) return null

  // Mock media items
  const mediaItems = [
    {
      id: "1",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      title: "Screenshot 2025-01-01",
      author: state.currentUser,
      timestamp: "2 hours ago",
      size: "1.2 MB",
    },
    {
      id: "2",
      type: "video",
      url: "/placeholder.svg?height=200&width=300",
      title: "Gameplay Recording",
      author: state.friends[0],
      timestamp: "5 hours ago",
      size: "15.3 MB",
    },
    {
      id: "3",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      title: "Meme Collection",
      author: state.currentUser,
      timestamp: "1 day ago",
      size: "800 KB",
    },
  ]

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Media Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-3">
          <ImageIcon className="w-6 h-6 text-[#72767d]" />
          <span className="text-white font-semibold">{state.selectedChannel.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={`text-[#b9bbbe] hover:text-[#dcddde] ${viewMode === "grid" ? "bg-[#393c43]" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`text-[#b9bbbe] hover:text-[#dcddde] ${viewMode === "list" ? "bg-[#393c43]" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List className="w-5 h-5" />
          </Button>
          <div className="w-px h-6 bg-[#40444b]" />
          <Input
            placeholder="Search media..."
            className="w-36 h-6 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] text-sm"
          />
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Media Content */}
      <div className="flex-1 p-4">
        {/* Upload Area */}
        <div className="mb-6">
          <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>

        {/* Media Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#2f3136] rounded-lg overflow-hidden hover:bg-[#32353b] cursor-pointer transition-colors"
              >
                <div className="aspect-square relative">
                  <img src={item.url || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-[#ffffff] text-sm font-medium truncate mb-1">{item.title}</h4>
                  <p className="text-[#72767d] text-xs">
                    {item.author?.displayName} • {item.timestamp}
                  </p>
                  <p className="text-[#72767d] text-xs">{item.size}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#2f3136] rounded-lg p-4 hover:bg-[#32353b] cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.url || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#ffffff] font-medium mb-1">{item.title}</h4>
                    <div className="flex items-center space-x-4 text-[#72767d] text-sm">
                      <span>Uploaded by {item.author?.displayName}</span>
                      <span>{item.timestamp}</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.type === "video" ? (
                      <Video className="w-5 h-5 text-[#72767d]" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-[#72767d]" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

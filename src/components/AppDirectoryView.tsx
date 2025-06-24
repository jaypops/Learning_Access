"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Star, Download, Bot, Gamepad2, Music, Zap } from "lucide-react"

export function AppDirectoryView() {
  const featuredApps = [
    {
      id: "1",
      name: "MEE6",
      description: "The most popular Discord bot! Moderation, leveling, music and much more!",
      icon: "/placeholder.svg?height=64&width=64",
      category: "Moderation",
      users: "16M+ servers",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Dyno",
      description: "Dyno is a feature-rich and modular discord bot for your Discord server.",
      icon: "/placeholder.svg?height=64&width=64",
      category: "Moderation",
      users: "8M+ servers",
      rating: 4.7,
    },
    {
      id: "3",
      name: "Groovy",
      description: "The best music bot for Discord. Play music from YouTube, Spotify, and more!",
      icon: "/placeholder.svg?height=64&width=64",
      category: "Music",
      users: "5M+ servers",
      rating: 4.9,
    },
  ]

  const categories = [
    { name: "All", icon: Bot, count: 150 },
    { name: "Moderation", icon: Zap, count: 45 },
    { name: "Music", icon: Music, count: 32 },
    { name: "Gaming", icon: Gamepad2, count: 28 },
    { name: "Utility", icon: Bot, count: 25 },
  ]

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-[#b9bbbe]" />
          <span className="text-white font-semibold">App Directory</span>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search apps..."
            className="w-64 h-8 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d]"
          />
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#5865f2] to-[#3b82f6] rounded-lg p-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">Discover Amazing Apps</h1>
            <p className="text-xl text-white/80 mb-6">Find bots and apps to enhance your Discord server experience</p>
            <Button className="bg-white text-[#5865f2] hover:bg-gray-100">Browse All Apps</Button>
          </div>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto mb-6">
            <TabsTrigger
              value="featured"
              className="bg-transparent px-4 py-2 text-[#5865f2] border-b-2 border-[#5865f2] data-[state=active]:bg-transparent"
            >
              Featured
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="bg-transparent px-4 py-2 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:text-[#5865f2] data-[state=active]:border-b-2 data-[state=active]:border-[#5865f2] data-[state=active]:bg-transparent"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="bg-transparent px-4 py-2 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:text-[#5865f2] data-[state=active]:border-b-2 data-[state=active]:border-[#5865f2] data-[state=active]:bg-transparent"
            >
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApps.map((app) => (
                <div key={app.id} className="bg-[#2f3136] rounded-lg p-6 hover:bg-[#32353b] transition-colors">
                  <div className="flex items-start space-x-4 mb-4">
                    <img src={app.icon || "/placeholder.svg"} alt={app.name} className="w-16 h-16 rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-[#ffffff] font-semibold text-lg mb-1">{app.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[#5865f2] text-sm bg-[#5865f2]/20 px-2 py-1 rounded">{app.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-[#faa61a] fill-current" />
                          <span className="text-[#dcddde] text-sm">{app.rating}</span>
                        </div>
                      </div>
                      <p className="text-[#72767d] text-sm">{app.users}</p>
                    </div>
                  </div>
                  <p className="text-[#b9bbbe] text-sm mb-4">{app.description}</p>
                  <div className="flex items-center space-x-2">
                    <Button className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Add to Server
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="bg-[#2f3136] rounded-lg p-6 hover:bg-[#32353b] transition-colors cursor-pointer text-center"
                >
                  <category.icon className="w-12 h-12 text-[#5865f2] mx-auto mb-3" />
                  <h3 className="text-[#ffffff] font-semibold mb-1">{category.name}</h3>
                  <p className="text-[#72767d] text-sm">{category.count} apps</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-[#72767d] mx-auto mb-4" />
              <h3 className="text-[#ffffff] text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-[#b9bbbe]">Trending apps will be available soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

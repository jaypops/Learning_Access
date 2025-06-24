import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Home } from "lucide-react"

export function DiscoverView() {
  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Discover Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-[#36393f] rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-[#b9bbbe]" />
          </div>
          <span className="text-white font-semibold">Discover</span>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search"
            className="w-64 h-8 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d]"
          />
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 py-3 bg-[#5865f2]">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto space-x-6">
            <TabsTrigger
              value="home"
              className="bg-transparent px-3 py-2 text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/10 rounded"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger
              value="gaming"
              className="bg-transparent px-3 py-2 text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/10 rounded"
            >
              Gaming
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="bg-transparent px-3 py-2 text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/10 rounded"
            >
              Music
            </TabsTrigger>
            <TabsTrigger
              value="entertainment"
              className="bg-transparent px-3 py-2 text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/10 rounded"
            >
              Entertainment
            </TabsTrigger>
            <TabsTrigger
              value="science"
              className="bg-transparent px-3 py-2 text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/10 rounded"
            >
              Science & Tech
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="bg-transparent px-3 py-2 text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/10 rounded"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="student"
              className="bg-transparent px-3 py-2 text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/10 rounded"
            >
              Student Hubs
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#5865f2] to-[#3b82f6] px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            FIND YOUR COMMUNITY
            <br />
            ON DISCORD
          </h1>
          <p className="text-xl text-white/80 mb-8">From gaming, to music, to learning, there's a place for you.</p>
        </div>
      </div>

      {/* Featured Servers */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Servers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#2f3136] rounded-lg overflow-hidden hover:bg-[#32353b] transition-colors cursor-pointer"
            >
              <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-[#36393f] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">S{i}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Server {i}</h3>
                    <p className="text-[#b9bbbe] text-sm">Gaming Community</p>
                  </div>
                </div>
                <p className="text-[#b9bbbe] text-sm mb-3">A great place to hang out and play games with friends.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#43b581] rounded-full" />
                    <span className="text-[#43b581] text-sm">1,234 Online</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#72767d] rounded-full" />
                    <span className="text-[#72767d] text-sm">5,678 Members</span>
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

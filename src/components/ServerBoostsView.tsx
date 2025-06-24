"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Zap, Crown, Users } from "lucide-react"

export function ServerBoostsView() {
  const { state } = useDiscord()

  if (!state.selectedServer) return null

  const boostLevels = [
    {
      level: 1,
      boostsRequired: 2,
      perks: ["100 Emoji Slots", "128 Kbps Audio Quality", "Animated Server Icon", "Better Quality Audio"],
      color: "from-[#f47fff] to-[#e06bef]",
    },
    {
      level: 2,
      boostsRequired: 5,
      perks: ["HD Streaming", "50MB File Uploads", "Custom Role Icons", "Server Banner"],
      color: "from-[#f47fff] to-[#e06bef]",
    },
    {
      level: 3,
      boostsRequired: 7,
      perks: ["Custom Server URL", "100MB File Uploads", "Highest Quality Audio", "Animated Server Banner"],
      color: "from-[#f47fff] to-[#e06bef]",
    },
  ]

  return (
    <div className="flex-1 flex bg-[#36393f]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f]">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[#f47fff] rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">Server Boosts</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Levels Section */}
          <div className="mb-8">
            <h2 className="text-[#ffffff] text-2xl font-bold mb-2">Levels</h2>
            <p className="text-[#b9bbbe] mb-6">
              Your server will automatically "level up" once it has enough available Boosts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {boostLevels.map((level) => (
                <div key={level.level} className="bg-[#2f3136] rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${level.color} rounded-full flex items-center justify-center`}
                    >
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#ffffff] text-xl font-bold">Level {level.level}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {level.perks.map((perk, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-[#43b581] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="text-[#dcddde] text-sm">{perk}</span>
                      </div>
                    ))}
                    <div className="text-[#b9bbbe] text-sm">...and more!</div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className={`px-4 py-2 bg-gradient-to-r ${level.color} rounded-full`}>
                      <span className="text-white font-bold">{level.boostsRequired} Boosts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Perks */}
          <div>
            <h2 className="text-[#ffffff] text-2xl font-bold mb-2">Additional Perks</h2>
            <p className="text-[#b9bbbe] mb-6">
              Individual perks that can be unlocked using available Boosts. No level required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2f3136] rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-[#f04747] text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#5865f2] to-[#3b82f6] rounded-lg flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#ffffff] text-lg font-bold">Premium Perks</h3>
                    <p className="text-[#b9bbbe] text-sm">Unlock exclusive features</p>
                  </div>
                </div>
                <ul className="text-[#dcddde] text-sm space-y-2 mb-4">
                  <li>• Custom welcome screen</li>
                  <li>• Priority support</li>
                  <li>• Advanced moderation tools</li>
                </ul>
                <Button className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white">Learn More</Button>
              </div>

              <div className="bg-[#2f3136] rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-[#f04747] text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#43b581] to-[#3ca374] rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#ffffff] text-lg font-bold">Community Features</h3>
                    <p className="text-[#b9bbbe] text-sm">Enhanced community tools</p>
                  </div>
                </div>
                <ul className="text-[#dcddde] text-sm space-y-2 mb-4">
                  <li>• Advanced member screening</li>
                  <li>• Custom invite splash</li>
                  <li>• Community insights</li>
                </ul>
                <Button className="w-full bg-[#43b581] hover:bg-[#3ca374] text-white">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-[#2f3136] border-l border-[#202225] p-6">
        <div className="text-center mb-6">
          <h3 className="text-[#ffffff] text-xl font-bold mb-2">SERVER BOOSTS</h3>
          <Button className="text-[#00aff4] hover:text-[#0099cc] bg-transparent p-0 h-auto font-normal">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-[#f47fff] text-2xl font-bold">{state.selectedServer.boosts.available}</div>
            <div className="text-[#b9bbbe] text-sm">Available</div>
          </div>
          <div className="text-center">
            <div className="text-[#b9bbbe] text-2xl font-bold">{state.selectedServer.boosts.spent}</div>
            <div className="text-[#b9bbbe] text-sm">Spent</div>
          </div>
          <div className="text-center">
            <div className="text-[#b9bbbe] text-2xl font-bold">{state.selectedServer.boosts.total}</div>
            <div className="text-[#b9bbbe] text-sm">Total</div>
          </div>
        </div>

        <Button className="w-full bg-[#f47fff] hover:bg-[#e06bef] text-white mb-6">
          <Zap className="w-4 h-4 mr-2" />
          Boost This Server
        </Button>

        <div className="space-y-4">
          <div className="bg-[#36393f] rounded-lg p-4">
            <h4 className="text-[#ffffff] font-semibold mb-2">Current Level</h4>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#40444b] rounded-full flex items-center justify-center">
                <span className="text-[#b9bbbe] font-bold">0</span>
              </div>
              <span className="text-[#b9bbbe]">No boosts yet</span>
            </div>
          </div>

          <div className="bg-[#36393f] rounded-lg p-4">
            <h4 className="text-[#ffffff] font-semibold mb-2">Next Level</h4>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#f47fff] to-[#e06bef] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <span className="text-[#dcddde]">2 boosts needed</span>
            </div>
            <div className="w-full bg-[#40444b] rounded-full h-2">
              <div className="bg-gradient-to-r from-[#f47fff] to-[#e06bef] h-2 rounded-full w-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, ShoppingBag, Star, Crown, Zap, Palette, Gift } from "lucide-react"

export function ShopView() {
  const shopItems = [
    {
      id: "1",
      name: "Discord Nitro",
      description: "Upgrade your Discord experience with premium features",
      price: "$9.99/month",
      image: "/placeholder.svg?height=120&width=120",
      category: "Subscriptions",
      popular: true,
    },
    {
      id: "2",
      name: "Server Boosts",
      description: "Boost your favorite servers with enhanced features",
      price: "$4.99/month",
      image: "/placeholder.svg?height=120&width=120",
      category: "Boosts",
      popular: false,
    },
    {
      id: "3",
      name: "Profile Decorations",
      description: "Customize your profile with unique decorations",
      price: "$2.99",
      image: "/placeholder.svg?height=120&width=120",
      category: "Cosmetics",
      popular: false,
    },
    {
      id: "4",
      name: "Animated Avatars",
      description: "Bring your avatar to life with animations",
      price: "$1.99",
      image: "/placeholder.svg?height=120&width=120",
      category: "Cosmetics",
      popular: true,
    },
  ]

  return (
    <div className="flex-1 flex flex-col bg-[#36393f] overflow-hidden">
      {/* Shop Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393f] flex-shrink-0">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-6 h-6 text-[#b9bbbe]" />
          <span className="text-white font-semibold">Shop</span>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search shop..."
            className="w-64 h-8 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d]"
          />
          <Button variant="ghost" size="icon" className="text-[#b9bbbe] hover:text-[#dcddde]">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Shop Content */}
      <div className="flex-1 p-6 overflow-y-auto overflow-x-auto min-w-[320px]">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#5865f2] to-[#3b82f6] rounded-lg p-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">Discord Shop</h1>
            <p className="text-xl text-white/80 mb-6">
              Enhance your Discord experience with premium features and customizations
            </p>
            <Button className="bg-white text-[#5865f2] hover:bg-gray-100">
              <Crown className="w-4 h-4 mr-2" />
              Get Nitro
            </Button>
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
              value="subscriptions"
              className="bg-transparent px-4 py-2 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:text-[#5865f2] data-[state=active]:border-b-2 data-[state=active]:border-[#5865f2] data-[state=active]:bg-transparent"
            >
              Subscriptions
            </TabsTrigger>
            <TabsTrigger
              value="cosmetics"
              className="bg-transparent px-4 py-2 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:text-[#5865f2] data-[state=active]:border-b-2 data-[state=active]:border-[#5865f2] data-[state=active]:bg-transparent"
            >
              Cosmetics
            </TabsTrigger>
            <TabsTrigger
              value="boosts"
              className="bg-transparent px-4 py-2 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:text-[#5865f2] data-[state=active]:border-b-2 data-[state=active]:border-[#5865f2] data-[state=active]:bg-transparent"
            >
              Server Boosts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <div key={item.id} className="bg-[#2f3136] rounded-lg p-6 hover:bg-[#32353b] transition-colors">
                  {item.popular && (
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="w-4 h-4 text-[#faa61a] fill-current" />
                      <span className="text-[#faa61a] text-sm font-semibold">Popular</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-[#ffffff] font-semibold text-lg mb-1">{item.name}</h3>
                      <span className="text-[#5865f2] text-sm bg-[#5865f2]/20 px-2 py-1 rounded">{item.category}</span>
                    </div>
                  </div>
                  <p className="text-[#b9bbbe] text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#ffffff] font-bold text-lg">{item.price}</span>
                    <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white">
                      <Gift className="w-4 h-4 mr-2" />
                      Purchase
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2f3136] rounded-lg p-8 hover:bg-[#32353b] transition-colors">
                <div className="text-center">
                  <Crown className="w-16 h-16 text-[#5865f2] mx-auto mb-4" />
                  <h3 className="text-[#ffffff] text-2xl font-bold mb-2">Discord Nitro</h3>
                  <p className="text-[#b9bbbe] mb-6">The ultimate Discord experience with premium features</p>
                  <div className="text-[#ffffff] text-3xl font-bold mb-6">$9.99/month</div>
                  <Button className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white mb-4">Subscribe Now</Button>
                  <ul className="text-[#b9bbbe] text-sm space-y-2">
                    <li>• Higher quality screen share</li>
                    <li>• Custom emoji everywhere</li>
                    <li>• Larger file uploads</li>
                    <li>• HD video streaming</li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#2f3136] rounded-lg p-8 hover:bg-[#32353b] transition-colors">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-[#f47fff] mx-auto mb-4" />
                  <h3 className="text-[#ffffff] text-2xl font-bold mb-2">Server Boosts</h3>
                  <p className="text-[#b9bbbe] mb-6">Boost your favorite servers with enhanced features</p>
                  <div className="text-[#ffffff] text-3xl font-bold mb-6">$4.99/month</div>
                  <Button className="w-full bg-[#f47fff] hover:bg-[#e06bef] text-white mb-4">Get Boosts</Button>
                  <ul className="text-[#b9bbbe] text-sm space-y-2">
                    <li>• Enhanced audio quality</li>
                    <li>• Custom server banner</li>
                    <li>• More emoji slots</li>
                    <li>• Vanity URL</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cosmetics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-[#2f3136] rounded-lg p-4 hover:bg-[#32353b] transition-colors">
                  <div className="aspect-square bg-[#40444b] rounded-lg mb-3 flex items-center justify-center">
                    <Palette className="w-8 h-8 text-[#b9bbbe]" />
                  </div>
                  <h4 className="text-[#ffffff] font-medium mb-1">Profile Decoration {i + 1}</h4>
                  <p className="text-[#72767d] text-sm mb-3">Customize your profile</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#ffffff] font-semibold">$2.99</span>
                    <Button size="sm" className="bg-[#5865f2] hover:bg-[#4752c4] text-white">
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="boosts" className="mt-0">
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-[#f47fff] mx-auto mb-4" />
              <h3 className="text-[#ffffff] text-xl font-semibold mb-2">Server Boosts</h3>
              <p className="text-[#b9bbbe] mb-6">Boost servers to unlock enhanced features and perks</p>
              <Button className="bg-[#f47fff] hover:bg-[#e06bef] text-white">Learn More About Boosts</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

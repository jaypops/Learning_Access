"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { useRouter } from "@/contexts/RouterContext"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  X,
  Search,
  User,
  Shield,
  Eye,
  Database,
  Users,
  Link,
  Clipboard,
  Crown,
  Zap,
  CreditCard,
  Gift,
  LogOut,
  Mic,
  Bell,
  Palette,
  Globe,
  Gamepad2,
  Menu,
} from "lucide-react"
import { useState } from "react"

export function SettingsDialog() {
  const { state, dispatch } = useDiscord()
  const { navigate } = useRouter()
  const [currentTab, setCurrentTab] = useState("my-account")
  const [currentSubTab, setCurrentSubTab] = useState("security")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("login")
  }

  if (!state.currentUser) return null

  const settingsCategories = [
    {
      title: "USER SETTINGS",
      items: [
        { id: "my-account", label: "My Account", icon: User, active: true },
        { id: "profiles", label: "Profiles", icon: User },
        { id: "privacy-safety", label: "Privacy & Safety", icon: Shield },
        { id: "authorized-apps", label: "Authorized Apps", icon: Link },
        { id: "connections", label: "Connections", icon: Link },
        { id: "friend-requests", label: "Friend Requests", icon: Users },
      ],
    },
    {
      title: "BILLING SETTINGS",
      items: [
        { id: "nitro", label: "Nitro", icon: Crown, badge: true },
        { id: "server-boost", label: "Server Boost", icon: Zap },
        { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
        { id: "gift-inventory", label: "Gift Inventory", icon: Gift, badge: true },
      ],
    },
    {
      title: "APP SETTINGS",
      items: [
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "accessibility", label: "Accessibility", icon: Eye },
        { id: "voice-video", label: "Voice & Video", icon: Mic },
        { id: "text-images", label: "Text & Images", icon: Clipboard },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "keybinds", label: "Keybinds", icon: Gamepad2 },
        { id: "language", label: "Language", icon: Globe },
        { id: "advanced", label: "Advanced", icon: Database },
      ],
    },
  ]

  const getCurrentTabLabel = () => {
    for (const category of settingsCategories) {
      const item = category.items.find((item) => item.id === currentTab)
      if (item) return item.label
    }
    return "Settings"
  }

  return (
    <Dialog open={state.isSettingsOpen} onOpenChange={() => dispatch({ type: "TOGGLE_SETTINGS" })}>
      <DialogContent className="bg-[#36393f] border-none max-w-[1000px] max-h-[90vh] w-full h-full p-0 m-0 overflow-hidden">
        <div className="flex h-full w-full max-w-[1000px] mx-auto overflow-hidden">
          {/* Mobile Sidebar Overlay */}
          {isMobileSidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#2f3136] flex flex-col">
                <div className="p-4 flex-shrink-0 border-b border-[#40444b]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white font-semibold">Settings</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#b9bbbe] hover:text-[#dcddde] w-8 h-8"
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#72767d]" />
                    <Input
                      placeholder="Search"
                      className="pl-10 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] h-8 text-sm"
                    />
                  </div>
                </div>

                <div className="flex-1 px-2 pb-4 overflow-y-auto">
                  {settingsCategories.map((category) => (
                    <div key={category.title} className="mb-4">
                      <div className="text-[#96989d] text-xs font-semibold uppercase tracking-wide mb-2 px-2">
                        {category.title}
                      </div>
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className={`w-full justify-start h-8 px-2 text-sm relative ${
                              currentTab === item.id
                                ? "bg-[#393c43] text-[#ffffff]"
                                : "text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde]"
                            }`}
                            onClick={() => {
                              setCurrentTab(item.id)
                              setIsMobileSidebarOpen(false)
                            }}
                          >
                            <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <div className="absolute right-2 w-2 h-2 bg-[#f04747] rounded-full flex-shrink-0"></div>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-[#40444b] pt-4 mt-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-8 px-2 text-[#f04747] hover:bg-[#393c43] hover:text-[#f04747]"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="truncate">Log Out</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Settings Sidebar */}
          <div className="hidden md:flex w-[218px] bg-[#2f3136] flex-col flex-shrink-0 overflow-hidden">
            <div className="p-4 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#72767d]" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] h-8 text-sm"
                />
              </div>
            </div>

            <div className="flex-1 px-2 pb-4 overflow-y-auto overflow-x-auto min-w-[200px]">
              {settingsCategories.map((category) => (
                <div key={category.title} className="mb-4">
                  <div className="text-[#96989d] text-xs font-semibold uppercase tracking-wide mb-2 px-2">
                    {category.title}
                  </div>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={`w-full justify-start h-8 px-2 text-sm relative ${
                          currentTab === item.id
                            ? "bg-[#393c43] text-[#ffffff]"
                            : "text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde]"
                        }`}
                        onClick={() => setCurrentTab(item.id)}
                      >
                        <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <div className="absolute right-2 w-2 h-2 bg-[#f04747] rounded-full flex-shrink-0"></div>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-[#40444b] pt-4 mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-8 px-2 text-[#f04747] hover:bg-[#393c43] hover:text-[#f04747]"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">Log Out</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 flex flex-col bg-[#36393f] min-w-0 overflow-hidden">
            {/* Header */}
            <div className="h-[60px] px-6 flex items-center justify-between border-b border-[#202225] flex-shrink-0">
              <div className="flex items-center space-x-3">
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-[#b9bbbe] hover:text-[#dcddde] w-8 h-8"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-white text-xl font-bold truncate">{getCurrentTabLabel()}</h1>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="hidden sm:block text-[#72767d] text-sm">ESC</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#b9bbbe] hover:text-[#dcddde] w-8 h-8"
                  onClick={() => dispatch({ type: "TOGGLE_SETTINGS" })}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-auto min-w-[320px]">
              {currentTab === "my-account" && (
                <div className="p-6">
                  <Tabs value={currentSubTab} onValueChange={setCurrentSubTab} className="w-full">
                    <TabsList className="bg-transparent p-0 h-auto mb-6 border-b border-[#40444b]">
                      <TabsTrigger
                        value="security"
                        className="bg-transparent px-0 py-3 mr-8 text-[#5865f2] border-b-2 border-[#5865f2] data-[state=active]:bg-transparent rounded-none"
                      >
                        Security
                      </TabsTrigger>
                      <TabsTrigger
                        value="standing"
                        className="bg-transparent px-0 py-3 text-[#b9bbbe] hover:text-[#dcddde] data-[state=active]:text-[#5865f2] data-[state=active]:border-b-2 data-[state=active]:border-[#5865f2] data-[state=active]:bg-transparent rounded-none"
                      >
                        Standing
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="security" className="mt-0">
                      {/* Profile Banner */}
                      <div className="bg-gradient-to-r from-[#f23f42] to-[#ff6b6b] h-[100px] rounded-t-lg mb-0" />

                      {/* Profile Info */}
                      <div className="bg-[#2f3136] rounded-b-lg p-6 -mt-0 relative">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 -mt-12">
                          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#f23f42] to-[#ff6b6b] rounded-full flex items-center justify-center border-4 border-[#2f3136]">
                              <img
                                src={state.currentUser.avatar || "/placeholder.svg"}
                                alt={state.currentUser.displayName}
                                className="w-16 h-16 rounded-full"
                              />
                            </div>
                            <div className="text-center sm:text-left">
                              <h2 className="text-white text-xl font-bold">{state.currentUser.displayName}</h2>
                              <p className="text-[#b9bbbe]">{state.currentUser.username}</p>
                            </div>
                          </div>
                          <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white mt-4 sm:mt-0">
                            Edit User Profile
                          </Button>
                        </div>

                        {/* Account Details */}
                        <div className="space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[#40444b] space-y-2 sm:space-y-0">
                            <div>
                              <div className="text-white font-semibold mb-1">Display Name</div>
                              <div className="text-[#b9bbbe]">{state.currentUser.displayName}</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-[#40444b] text-[#dcddde] hover:bg-[#40444b] self-start sm:self-auto"
                            >
                              Edit
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[#40444b] space-y-2 sm:space-y-0">
                            <div>
                              <div className="text-white font-semibold mb-1">Username</div>
                              <div className="text-[#b9bbbe]">{state.currentUser.username}</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-[#40444b] text-[#dcddde] hover:bg-[#40444b] self-start sm:self-auto"
                            >
                              Edit
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[#40444b] space-y-2 sm:space-y-0">
                            <div>
                              <div className="text-white font-semibold mb-1">Email</div>
                              <div className="text-[#b9bbbe] flex items-center space-x-2">
                                <span>••••••••••••@gmail.com</span>
                                <Button
                                  variant="link"
                                  className="text-[#00aff4] hover:text-[#0099cc] p-0 h-auto text-sm"
                                >
                                  Reveal
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-[#40444b] text-[#dcddde] hover:bg-[#40444b] self-start sm:self-auto"
                            >
                              Edit
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 space-y-2 sm:space-y-0">
                            <div>
                              <div className="text-white font-semibold mb-1">Phone Number</div>
                              <div className="text-[#b9bbbe]">You haven't added a phone number yet.</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-[#40444b] text-[#dcddde] hover:bg-[#40444b] self-start sm:self-auto"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Password and Authentication */}
                      <div className="mt-8">
                        <h3 className="text-white text-xl font-bold mb-6">Password and Authentication</h3>

                        <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white mb-8">Change Password</Button>

                        <div className="space-y-8">
                          <div>
                            <h4 className="text-white font-semibold mb-2">Authenticator App</h4>
                            <p className="text-[#b9bbbe] text-sm mb-4">
                              Protect your Discord account with an extra layer of security. Once configured, you'll be
                              required to enter your password and complete one additional step in order to sign in.
                            </p>
                            <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white">
                              Enable Authenticator App
                            </Button>
                          </div>

                          <div>
                            <h4 className="text-white font-semibold mb-2">Security Keys</h4>
                            <p className="text-[#b9bbbe] text-sm mb-4">
                              Add an additional layer of protection to your account with a Security Key.
                            </p>
                            <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white">
                              Register a Security Key
                            </Button>
                          </div>

                          <div>
                            <h4 className="text-white font-semibold mb-2">Account Removal</h4>
                            <p className="text-[#b9bbbe] text-sm mb-4">
                              Disabling your account means you can recover it at any time after taking this action.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                              <Button className="bg-[#f04747] hover:bg-[#d73527] text-white">Disable Account</Button>
                              <Button
                                variant="outline"
                                className="bg-transparent border-[#f04747] text-[#f04747] hover:bg-[#f04747] hover:text-white"
                              >
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="standing" className="mt-0">
                      <div className="text-center py-12">
                        <Shield className="w-16 h-16 text-[#43b581] mx-auto mb-4" />
                        <h3 className="text-[#ffffff] text-xl font-semibold mb-2">Your account is in good standing</h3>
                        <p className="text-[#b9bbbe]">You haven't violated any of Discord's community guidelines.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Other settings tabs remain the same but with responsive improvements */}
              {currentTab === "appearance" && (
                <div className="p-6 space-y-8">
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Theme</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div>
                          <div className="text-white font-medium">Dark</div>
                          <div className="text-[#b9bbbe] text-sm">A sleek, modern look</div>
                        </div>
                        <Switch checked={state.theme === "dark"} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div>
                          <div className="text-white font-medium">Sync with computer</div>
                          <div className="text-[#b9bbbe] text-sm">Discord will sync with your system's theme</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Message Display</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div>
                          <div className="text-white font-medium">Compact Mode</div>
                          <div className="text-[#b9bbbe] text-sm">Show more messages at once</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Accessibility</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div>
                          <div className="text-white font-medium">Chat Font Scaling</div>
                          <div className="text-[#b9bbbe] text-sm">Make the chat font larger or smaller</div>
                        </div>
                        <div className="w-full sm:w-32">
                          <Slider defaultValue={[16]} max={24} min={12} step={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add similar responsive improvements to other tabs... */}
              {currentTab === "voice-video" && (
                <div className="p-6 space-y-8">
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Camera</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white font-medium mb-2 block">Camera</label>
                        <Select defaultValue="default">
                          <SelectTrigger className="bg-[#2f3136] border-[#40444b] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2f3136] border-[#40444b]">
                            <SelectItem value="default">Default Camera</SelectItem>
                            <SelectItem value="webcam">Built-in Webcam</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div>
                          <div className="text-white font-medium">Always preview video</div>
                          <div className="text-[#b9bbbe] text-sm">Show a preview of your camera</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Microphone</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white font-medium mb-2 block">Input Device</label>
                        <Select defaultValue="default">
                          <SelectTrigger className="bg-[#2f3136] border-[#40444b] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2f3136] border-[#40444b]">
                            <SelectItem value="default">Default Microphone</SelectItem>
                            <SelectItem value="builtin">Built-in Microphone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">Input Volume</label>
                        <Slider defaultValue={[50]} max={100} min={0} step={1} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div>
                          <div className="text-white font-medium">Noise Suppression</div>
                          <div className="text-[#b9bbbe] text-sm">Reduce background noise</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {!["my-account", "appearance", "voice-video"].includes(currentTab) && (
                <div className="p-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#40444b] rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-[#72767d] text-2xl">⚙️</div>
                    </div>
                    <h3 className="text-[#ffffff] text-xl font-semibold mb-2">{getCurrentTabLabel()}</h3>
                    <p className="text-[#b9bbbe]">This settings page is under development.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

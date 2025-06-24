"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Plus, Settings, MicOff, HeadphonesIcon, Compass, Download, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const { state, dispatch } = useDiscord()

  if (!state.isMobileMenuOpen || !state.currentUser) return null

  const handleNavigation = (targetView: string, additionalAction?: () => void) => {
    // If we're already on the target view, just close the menu with a slight delay
    if (state.currentView === targetView) {
      // Use setTimeout to ensure smooth closing without conflicts
      setTimeout(() => {
        dispatch({ type: "TOGGLE_MOBILE_MENU" })
      }, 50)
    } else {
      // Navigate to new view and close menu
      if (additionalAction) {
        additionalAction()
      }
      dispatch({ type: "TOGGLE_MOBILE_MENU" })
    }
  }

  const handleServerNavigation = (server: any) => {
    if (state.selectedServer?.id === server.id && state.currentView === "server") {
      // Already on this server, just close menu
      setTimeout(() => {
        dispatch({ type: "TOGGLE_MOBILE_MENU" })
      }, 50)
    } else {
      dispatch({ type: "SELECT_SERVER", payload: server })
      dispatch({ type: "SET_CURRENT_VIEW", payload: "server" })
      dispatch({ type: "TOGGLE_MOBILE_MENU" })
    }
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })} />
      <div className="absolute left-0 top-0 bottom-0 flex max-w-[90vw]">
        {/* Server Sidebar */}
        <div className="w-[72px] bg-[#202225] flex flex-col items-center py-3 space-y-2 flex-shrink-0">
          {/* Discord Logo */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-[24px] bg-[#5865f2] hover:bg-[#5865f2] hover:rounded-[16px] transition-all duration-200",
              state.currentView === "friends" && "rounded-[16px]",
            )}
            onClick={() =>
              handleNavigation("friends", () => {
                if (state.currentView !== "friends") {
                  dispatch({ type: "SET_CURRENT_VIEW", payload: "friends" })
                }
              })
            }
          >
            <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#5865f2]">
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
              </svg>
            </div>
          </Button>

          <div className="w-8 h-[2px] bg-[#36393f] rounded-full" />

          {/* Servers */}
          {state.servers.map((server) => (
            <Button
              key={server.id}
              variant="ghost"
              size="icon"
              className={cn(
                "w-12 h-12 rounded-[24px] bg-[#36393f] hover:bg-[#5865f2] hover:rounded-[16px] transition-all duration-200 text-white font-semibold text-sm",
                state.selectedServer?.id === server.id && "bg-[#5865f2] rounded-[16px]",
              )}
              onClick={() => handleServerNavigation(server)}
            >
              {server.icon}
            </Button>
          ))}

          {/* Add Server */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-[24px] bg-[#36393f] hover:bg-[#43b581] hover:rounded-[16px] transition-all duration-200 text-[#43b581] hover:text-white"
            onClick={() => {
              dispatch({ type: "TOGGLE_CREATE_SERVER" })
              dispatch({ type: "TOGGLE_MOBILE_MENU" })
            }}
          >
            <Plus className="w-6 h-6" />
          </Button>

          {/* Discover */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-[24px] bg-[#36393f] hover:bg-[#43b581] hover:rounded-[16px] transition-all duration-200 text-[#43b581] hover:text-white",
              state.currentView === "discover" && "bg-[#43b581] text-white rounded-[16px]",
            )}
            onClick={() =>
              handleNavigation("discover", () => {
                if (state.currentView !== "discover") {
                  dispatch({ type: "SET_CURRENT_VIEW", payload: "discover" })
                }
              })
            }
          >
            <Compass className="w-6 h-6" />
          </Button>

          <div className="flex-1" />

          {/* Download */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-[24px] bg-[#36393f] hover:bg-[#43b581] hover:rounded-[16px] transition-all duration-200 text-[#43b581] hover:text-white"
            onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })}
          >
            <Download className="w-6 h-6" />
          </Button>
        </div>

        {/* Main Menu Content */}
        <div className="w-80 bg-[#2f3136] flex flex-col h-full overflow-hidden">
          {/* Search */}
          <div className="p-4 flex-shrink-0">
            <Input
              placeholder="Find or start a conversation"
              className="bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] h-10 text-sm rounded-lg"
            />
          </div>

          {/* Navigation */}
          <div className="px-4 space-y-1 flex-shrink-0">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde] rounded-lg",
                state.currentView === "friends" && "bg-[#393c43] text-[#dcddde]",
              )}
              onClick={() =>
                handleNavigation("friends", () => {
                  if (state.currentView !== "friends") {
                    dispatch({ type: "SET_CURRENT_VIEW", payload: "friends" })
                  }
                })
              }
            >
              <UserPlus className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Friends</span>
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde] rounded-lg",
                state.currentView === "shop" && "bg-[#393c43] text-[#dcddde]",
              )}
              onClick={() =>
                handleNavigation("shop", () => {
                  if (state.currentView !== "shop") {
                    dispatch({ type: "SET_CURRENT_VIEW", payload: "shop" })
                  }
                })
              }
            >
              <ShoppingBag className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Shop</span>
            </Button>
          </div>

          {/* Direct Messages */}
          <div className="flex-1 px-4 mt-6 overflow-y-auto min-h-0">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <span className="text-[#96989d] text-xs font-semibold uppercase tracking-wide">Direct Messages</span>
              <Button variant="ghost" size="icon" className="w-4 h-4 text-[#96989d] hover:text-[#dcddde] flex-shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {state.friends.map((friend) => (
                <Button
                  key={friend.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 px-3 text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde] rounded-lg",
                    state.selectedFriend?.id === friend.id && "bg-[#393c43] text-[#dcddde]",
                  )}
                  onClick={() => {
                    dispatch({ type: "SELECT_FRIEND", payload: friend })
                    dispatch({ type: "TOGGLE_MOBILE_MENU" })
                  }}
                >
                  <div className="relative mr-3 flex-shrink-0">
                    <img
                      src={friend.avatar || "/placeholder.svg"}
                      alt={friend.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#2f3136]",
                        friend.isOnline ? "bg-[#43b581]" : "bg-[#747f8d]",
                      )}
                    />
                  </div>
                  <span className="truncate text-white">{friend.displayName}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* User Panel */}
          <div className="h-[60px] bg-[#292b2f] px-4 flex items-center flex-shrink-0">
            <div className="flex items-center flex-1 min-w-0">
              <div className="relative mr-3 flex-shrink-0">
                <img
                  src={state.currentUser.avatar || "/placeholder.svg"}
                  alt={state.currentUser.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#43b581] rounded-full border-2 border-[#292b2f]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[#ffffff] text-sm font-medium truncate">{state.currentUser.displayName}</div>
                <div className="text-[#b9bbbe] text-xs truncate">Online</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
                <MicOff className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]">
                <HeadphonesIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-[#b9bbbe] hover:text-[#dcddde]"
                onClick={() => {
                  dispatch({ type: "TOGGLE_SETTINGS" })
                  dispatch({ type: "TOGGLE_MOBILE_MENU" })
                }}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

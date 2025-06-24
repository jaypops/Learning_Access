"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Plus, Compass, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export function ServerSidebar() {
  const { state, dispatch } = useDiscord()

  return (
    <div className="hidden md:flex w-[72px] bg-[#202225] flex-col items-center py-3 space-y-2">
      {/* Discord Logo */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "w-12 h-12 rounded-[24px] bg-[#5865f2] hover:bg-[#5865f2] hover:rounded-[16px] transition-all duration-200",
          state.currentView === "friends" && "rounded-[16px]",
        )}
        onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "friends" })}
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
            "w-12 h-12 rounded-[24px] bg-[#36393f] hover:bg-[#5865f2] hover:rounded-[16px] transition-all duration-200 text-white font-semibold",
            state.selectedServer?.id === server.id && "bg-[#5865f2] rounded-[16px]",
          )}
          onClick={() => {
            dispatch({ type: "SELECT_SERVER", payload: server })
            dispatch({ type: "SET_CURRENT_VIEW", payload: "server" })
          }}
        >
          {server.icon}
        </Button>
      ))}

      {/* Add Server */}
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-[24px] bg-[#36393f] hover:bg-[#43b581] hover:rounded-[16px] transition-all duration-200 text-[#43b581] hover:text-white"
        onClick={() => dispatch({ type: "TOGGLE_CREATE_SERVER" })}
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
        onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "discover" })}
      >
        <Compass className="w-6 h-6" />
      </Button>

      <div className="flex-1" />

      {/* Download */}
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-[24px] bg-[#36393f] hover:bg-[#43b581] hover:rounded-[16px] transition-all duration-200 text-[#43b581] hover:text-white"
      >
        <Download className="w-6 h-6" />
      </Button>
    </div>
  )
}

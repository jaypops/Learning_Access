"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function CreateServerDialog() {
  const { state, dispatch } = useDiscord()

  return (
    <Dialog open={state.isCreateServerOpen} onOpenChange={() => dispatch({ type: "TOGGLE_CREATE_SERVER" })}>
      <DialogContent className="bg-[#36393f] border-[#202225] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl font-bold">Create Your Server</DialogTitle>
        </DialogHeader>

        <div className="text-center text-[#b9bbbe] mb-6">
          Your server is where you and your friends hang out. Make yours and start talking.
        </div>

        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-between h-12 px-4 bg-[#2f3136] hover:bg-[#393c43] text-white"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#43b581] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🛠️</span>
              </div>
              <span>Create My Own</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#b9bbbe]" />
          </Button>

          <div className="py-2">
            <div className="text-[#96989d] text-xs font-semibold uppercase tracking-wide mb-2">
              Start from a template
            </div>

            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-between h-12 px-4 bg-[#2f3136] hover:bg-[#393c43] text-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎮</span>
                  </div>
                  <span>Gaming</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#b9bbbe]" />
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-between h-12 px-4 bg-[#2f3136] hover:bg-[#393c43] text-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#f23f42] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💖</span>
                  </div>
                  <span>Friends</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#b9bbbe]" />
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-between h-12 px-4 bg-[#2f3136] hover:bg-[#393c43] text-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#f23f42] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🍎</span>
                  </div>
                  <span>Study Group</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#b9bbbe]" />
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-between h-12 px-4 bg-[#2f3136] hover:bg-[#393c43] text-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📚</span>
                  </div>
                  <span>School Club</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#b9bbbe]" />
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#40444b]">
            <div className="text-center mb-4">
              <div className="text-[#ffffff] font-semibold mb-1">Have an invite already?</div>
            </div>
            <Button variant="discord-secondary" className="w-full">
              Join a Server
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useDiscord } from "@/contexts/DiscordContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function AddFriendDialog() {
  const { state, dispatch } = useDiscord()

  return (
    <Dialog open={state.isAddFriendOpen} onOpenChange={() => dispatch({ type: "TOGGLE_ADD_FRIEND" })}>
      <DialogContent className="bg-[#36393f] border-[#202225] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl font-bold">Select Friends</DialogTitle>
        </DialogHeader>

        <div className="text-center py-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#2f3136] rounded-full flex items-center justify-center">
            <div className="text-4xl">🤖</div>
          </div>
          <div className="text-[#b9bbbe] mb-6">You don't have any friends to add!</div>
          <Button variant="discord" className="w-full" onClick={() => dispatch({ type: "TOGGLE_ADD_FRIEND" })}>
            Add Friend
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { useDiscord } from "@/contexts/DiscordContext"
import { TextChannelView } from "./channels/TextChannelView"
import { VoiceChannelView } from "./channels/VoiceChannelView"
import { ForumChannelView } from "./channels/ForumChannelView"
import { StageChannelView } from "./channels/StageChannelView"
import { MediaChannelView } from "./channels/MediaChannelView"

export function ServerView() {
  const { state } = useDiscord()

  if (!state.selectedServer || !state.selectedChannel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#36393f]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#ffffff] mb-2">Welcome to {state.selectedServer?.name}</h2>
          <p className="text-[#b9bbbe]">Select a channel to get started</p>
        </div>
      </div>
    )
  }

  switch (state.selectedChannel.type) {
    case "text":
      return <TextChannelView />
    case "voice":
      return <VoiceChannelView />
    case "forum":
      return <ForumChannelView />
    case "stage":
      return <StageChannelView />
    case "media":
      return <MediaChannelView />
    default:
      return <TextChannelView />
  }
}

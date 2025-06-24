import { useDiscord } from "@/contexts/DiscordContext"
import { FriendsView } from "./FriendsView"
import { ServerView } from "./ServerView"
import { DiscoverView } from "./DiscoverView"
import { UserProfileView } from "./UserProfileView"
import { AppDirectoryView } from "./AppDirectoryView"
import { ShopView } from "./ShopView"
import { ServerBoostsView } from "./ServerBoostsView"

export function MainContent() {
  const { state } = useDiscord()

  const renderView = () => {
    switch (state.currentView) {
      case "friends":
        return <FriendsView />
      case "server":
        return <ServerView />
      case "discover":
        return <DiscoverView />
      case "profile":
        return <UserProfileView />
      case "app-directory":
        return <AppDirectoryView />
      case "shop":
        return <ShopView />
      case "server-boosts":
        return <ServerBoostsView />
      default:
        return <FriendsView />
    }
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-x-auto overflow-y-auto min-w-[320px]">{renderView()}</div>
    </div>
  )
}

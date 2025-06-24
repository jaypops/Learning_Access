import { ServerSidebar } from "./ServerSidebar"
import { ChannelSidebar } from "./ChannelSidebar"
import { MainContent } from "./MainContent"
import { MobileHeader } from "./MobileHeader"
import { MobileMenu } from "./MobileMenu"
import { CreateServerDialog } from "./dialogs/CreateServerDialog"
import { AddFriendDialog } from "./dialogs/AddFriendDialog"
import { SettingsDialog } from "./dialogs/SettingsDialog"

export function DiscordApp() {
  return (
    <div className="fixed inset-0 bg-[#36393f] flex flex-col overflow-hidden">
      <MobileHeader />
      <div className="flex-1 flex overflow-hidden">
        <ServerSidebar />
        <ChannelSidebar />
        <MainContent />
      </div>
      <MobileMenu />
      <CreateServerDialog />
      <AddFriendDialog />
      <SettingsDialog />
    </div>
  )
}

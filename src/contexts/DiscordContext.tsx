"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  status: "online" | "offline" | "away" | "dnd"
  memberSince: string
  bio?: string
  banner?: string
  badges?: string[]
}

interface Friend extends User {
  isOnline: boolean
}

interface Server {
  id: string
  name: string
  icon: string
  banner?: string
  description?: string
  channels: Channel[]
  categories: Category[]
  members: User[]
  roles: Role[]
  boosts: {
    level: number
    available: number
    spent: number
    total: number
  }
}

interface Category {
  id: string
  name: string
  channels: string[]
}

interface Channel {
  id: string
  name: string
  type: "text" | "voice" | "stage" | "forum" | "media"
  categoryId?: string
  topic?: string
  nsfw?: boolean
}

interface Role {
  id: string
  name: string
  color: string
  permissions: string[]
  position: number
}

interface Message {
  id: string
  content: string
  author: User
  timestamp: string
  reactions?: Reaction[]
  attachments?: string[]
  thread?: Thread
}

interface Thread {
  id: string
  name: string
  messages: Message[]
}

interface Reaction {
  emoji: string
  count: number
  users: string[]
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: User
  timestamp: string
  tags: string[]
  replies: number
  lastReply?: string
}

interface DiscordState {
  isAuthenticated: boolean
  currentUser: User | null
  friends: Friend[]
  servers: Server[]
  currentView: "friends" | "server" | "discover" | "settings" | "profile" | "app-directory" | "shop" | "server-boosts"
  currentFriendsTab: "online" | "all" | "pending" | "blocked" | "add-friend"
  selectedFriend: Friend | null
  selectedServer: Server | null
  selectedChannel: Channel | null
  selectedThread: Thread | null
  messages: Message[]
  forumPosts: ForumPost[]
  isMobileMenuOpen: boolean
  isSettingsOpen: boolean
  isCreateServerOpen: boolean
  isAddFriendOpen: boolean
  isProfileOpen: boolean
  currentSettingsTab: string
  theme: "dark" | "light"
  notifications: {
    mentions: boolean
    servers: boolean
    dms: boolean
  }
  voiceSettings: {
    inputDevice: string
    outputDevice: string
    inputVolume: number
    outputVolume: number
  }
}

type DiscordAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_CURRENT_VIEW"; payload: DiscordState["currentView"] }
  | { type: "SET_FRIENDS_TAB"; payload: DiscordState["currentFriendsTab"] }
  | { type: "SELECT_FRIEND"; payload: Friend | null }
  | { type: "SELECT_SERVER"; payload: Server | null }
  | { type: "SELECT_CHANNEL"; payload: Channel | null }
  | { type: "SELECT_THREAD"; payload: Thread | null }
  | { type: "TOGGLE_MOBILE_MENU" }
  | { type: "TOGGLE_SETTINGS" }
  | { type: "TOGGLE_CREATE_SERVER" }
  | { type: "TOGGLE_ADD_FRIEND" }
  | { type: "TOGGLE_PROFILE" }
  | { type: "SET_SETTINGS_TAB"; payload: string }
  | { type: "SET_THEME"; payload: "dark" | "light" }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "UPDATE_NOTIFICATIONS"; payload: Partial<DiscordState["notifications"]> }
  | { type: "UPDATE_VOICE_SETTINGS"; payload: Partial<DiscordState["voiceSettings"]> }

const initialState: DiscordState = {
  isAuthenticated: false,
  currentUser: null,
  friends: [],
  servers: [],
  currentView: "friends",
  currentFriendsTab: "online",
  selectedFriend: null,
  selectedServer: null,
  selectedChannel: null,
  selectedThread: null,
  messages: [],
  forumPosts: [],
  isMobileMenuOpen: false,
  isSettingsOpen: false,
  isCreateServerOpen: false,
  isAddFriendOpen: false,
  isProfileOpen: false,
  currentSettingsTab: "account",
  theme: "dark",
  notifications: {
    mentions: true,
    servers: true,
    dms: true,
  },
  voiceSettings: {
    inputDevice: "Default",
    outputDevice: "Default",
    inputVolume: 50,
    outputVolume: 50,
  },
}

const mockUser: User = {
  id: "1",
  username: "richnic123",
  displayName: "richnic",
  avatar: "/placeholder.svg?height=32&width=32",
  status: "online",
  memberSince: "Jun 17, 2025",
  bio: "Just a regular Discord user",
  badges: ["Early Supporter", "Nitro"],
}

const mockFriends: Friend[] = [
  {
    id: "2",
    username: "Alice Bat",
    displayName: "Alice Bat",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    memberSince: "Jun 17, 2025",
    isOnline: true,
  },
  {
    id: "3",
    username: "Bob Smith",
    displayName: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    memberSince: "May 15, 2025",
    isOnline: true,
  },
  {
    id: "4",
    username: "Charlie Brown",
    displayName: "Charlie Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "offline",
    memberSince: "Apr 10, 2025",
    isOnline: false,
  },
]

const mockServers: Server[] = [
  {
    id: "1",
    name: "richnic's server",
    icon: "rs",
    description: "A cool server for friends",
    channels: [
      { id: "1", name: "general", type: "text", categoryId: "1" },
      { id: "2", name: "clips-and-highlights", type: "text", categoryId: "1" },
      { id: "3", name: "announcements", type: "forum", categoryId: "1" },
      { id: "4", name: "media-share", type: "media", categoryId: "1" },
      { id: "5", name: "Lobby", type: "voice", categoryId: "2" },
      { id: "6", name: "Gaming", type: "voice", categoryId: "2" },
      { id: "7", name: "Stage", type: "stage", categoryId: "2" },
    ],
    categories: [
      { id: "1", name: "Text Channels", channels: ["1", "2", "3", "4"] },
      { id: "2", name: "Voice Channels", channels: ["5", "6", "7"] },
    ],
    members: [mockUser, ...mockFriends],
    roles: [
      { id: "1", name: "Admin", color: "#ff0000", permissions: ["all"], position: 1 },
      { id: "2", name: "Member", color: "#00ff00", permissions: ["read", "write"], position: 2 },
    ],
    boosts: {
      level: 0,
      available: 0,
      spent: 0,
      total: 0,
    },
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    content: "hi",
    author: {
      id: "2",
      username: "Alice Bat",
      displayName: "Alice Bat",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "online",
      memberSince: "Jun 17, 2025",
    },
    timestamp: "4:35 PM",
  },
]

const mockForumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Welcome to the server!",
    content: "This is our first announcement post.",
    author: mockUser,
    timestamp: "2 hours ago",
    tags: ["announcement", "welcome"],
    replies: 5,
    lastReply: "1 hour ago",
  },
]

function discordReducer(state: DiscordState, action: DiscordAction): DiscordState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
        friends: mockFriends,
        servers: mockServers,
        messages: mockMessages,
        forumPosts: mockForumPosts,
        currentView: "friends", // Default to friends view after login
      }
    case "LOGOUT":
      return {
        ...initialState,
        isAuthenticated: false,
        currentUser: null,
      }
    case "SET_CURRENT_VIEW":
      return { ...state, currentView: action.payload, selectedFriend: null }
    case "SET_FRIENDS_TAB":
      return { ...state, currentFriendsTab: action.payload }
    case "SELECT_FRIEND":
      return { ...state, selectedFriend: action.payload }
    case "SELECT_SERVER":
      return { ...state, selectedServer: action.payload }
    case "SELECT_CHANNEL":
      return { ...state, selectedChannel: action.payload }
    case "SELECT_THREAD":
      return { ...state, selectedThread: action.payload }
    case "TOGGLE_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen }
    case "TOGGLE_SETTINGS":
      return { ...state, isSettingsOpen: !state.isSettingsOpen }
    case "TOGGLE_CREATE_SERVER":
      return { ...state, isCreateServerOpen: !state.isCreateServerOpen }
    case "TOGGLE_ADD_FRIEND":
      return { ...state, isAddFriendOpen: !state.isAddFriendOpen }
    case "TOGGLE_PROFILE":
      return { ...state, isProfileOpen: !state.isProfileOpen }
    case "SET_SETTINGS_TAB":
      return { ...state, currentSettingsTab: action.payload }
    case "SET_THEME":
      return { ...state, theme: action.payload }
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] }
    case "UPDATE_NOTIFICATIONS":
      return { ...state, notifications: { ...state.notifications, ...action.payload } }
    case "UPDATE_VOICE_SETTINGS":
      return { ...state, voiceSettings: { ...state.voiceSettings, ...action.payload } }
    default:
      return state
  }
}

const DiscordContext = createContext<{
  state: DiscordState
  dispatch: React.Dispatch<DiscordAction>
} | null>(null)

export function DiscordProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(discordReducer, initialState)

  return <DiscordContext.Provider value={{ state, dispatch }}>{children}</DiscordContext.Provider>
}

export function useDiscord() {
  const context = useContext(DiscordContext)
  if (!context) {
    throw new Error("useDiscord must be used within a DiscordProvider")
  }
  return context
}

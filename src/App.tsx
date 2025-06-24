"use client"

import { useDiscord } from "./contexts/DiscordContext"
import { useRouter } from "./contexts/RouterContext"
import { LoginPage } from "./components/auth/LoginPage"
import { RegisterPage } from "./components/auth/RegisterPage"
import { DiscordApp } from "./components/DiscordApp"
import { useEffect } from "react"

function App() {
  const { state } = useDiscord()
  const { currentRoute, navigate } = useRouter()

  // Auto-redirect logic
  useEffect(() => {
    if (state.isAuthenticated && currentRoute !== "app") {
      navigate("app")
    } else if (!state.isAuthenticated && currentRoute === "app") {
      navigate("login")
    }
  }, [state.isAuthenticated, currentRoute, navigate])

  const renderCurrentRoute = () => {
    switch (currentRoute) {
      case "login":
        return <LoginPage />
      case "register":
        return <RegisterPage />
      case "app":
        return state.isAuthenticated ? <DiscordApp /> : <LoginPage />
      default:
        return <LoginPage />
    }
  }

  return <div className="fixed inset-0 bg-[#36393f] overflow-hidden">{renderCurrentRoute()}</div>
}

export default App

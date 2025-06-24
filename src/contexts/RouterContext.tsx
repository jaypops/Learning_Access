"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Route = "login" | "register" | "app"

interface RouterContextType {
  currentRoute: Route
  navigate: (route: Route) => void
}

const RouterContext = createContext<RouterContextType | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<Route>("login")

  const navigate = (route: Route) => {
    setCurrentRoute(route)
  }

  return <RouterContext.Provider value={{ currentRoute, navigate }}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider")
  }
  return context
}

// Custom Link component to replace react-router Link
export function Link({
  to,
  children,
  className,
}: {
  to: Route
  children: ReactNode
  className?: string
}) {
  const { navigate } = useRouter()

  return (
    <button
      onClick={() => navigate(to)}
      className={`${className} cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit`}
    >
      {children}
    </button>
  )
}

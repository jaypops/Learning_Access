import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App.tsx"
import "./index.css"
import { DiscordProvider } from "./contexts/DiscordContext"
import { RouterProvider } from "./contexts/RouterContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function AppWrapper() {
  return (
    <React.StrictMode>
      <RouterProvider>
        <QueryClientProvider client={queryClient}>
          <DiscordProvider>
            <App />
          </DiscordProvider>
        </QueryClientProvider>
      </RouterProvider>
    </React.StrictMode>
  )
}

const container = document.getElementById("root")
if (!container) {
  const newContainer = document.createElement("div")
  newContainer.id = "root"
  document.body.appendChild(newContainer)
}

const root = ReactDOM.createRoot(container || document.getElementById("root")!)
root.render(<AppWrapper />)

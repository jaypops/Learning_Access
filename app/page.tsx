"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "@/App"
import { DiscordProvider } from "@/contexts/DiscordContext"
import { RouterProvider } from "@/contexts/RouterContext"

/**
 * Creates the same wrapper used in `src/main.tsx`
 * so that App has access to Router, QueryClient, and Discord contexts.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
})

export default function Home() {
  return (
    <RouterProvider>
      <QueryClientProvider client={queryClient}>
        <DiscordProvider>
          <App />
        </DiscordProvider>
      </QueryClientProvider>
    </RouterProvider>
  )
}

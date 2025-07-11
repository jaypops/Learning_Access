"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "../../contexts/RouterContext"
import { useRouter } from "../../contexts/RouterContext"
import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useDiscord()
  const { navigate } = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      dispatch({
        type: "LOGIN",
        payload: {
          id: "1",
          username: "richnic123",
          displayName: "richnic",
          avatar: "/placeholder.svg?height=32&width=32",
          status: "online",
          memberSince: "Jun 17, 2025",
        },
      })
      setIsLoading(false)
      navigate("app")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#5865f2] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#36393f] rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-[#b9bbbe]">We're so excited to see you again!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[#b9bbbe] text-xs font-bold uppercase tracking-wide mb-2">
                Email or Phone Number <span className="text-[#f04747]">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] focus:ring-0 h-10"
                required
              />
            </div>

            <div>
              <label className="block text-[#b9bbbe] text-xs font-bold uppercase tracking-wide mb-2">
                Password <span className="text-[#f04747]">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] focus:ring-0 h-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#b9bbbe] hover:text-[#dcddde] h-6 w-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="text-left">
              <span className="text-[#00aff4] text-sm hover:underline cursor-pointer">Forgot your password?</span>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium h-11 rounded"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>

            <div className="text-sm text-[#72767d]">
              Need an account?{" "}
              <Link to="register" className="text-[#00aff4] hover:underline">
                Register
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#40444b]">
            <div className="text-xs text-[#72767d] mb-4">Or continue with</div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full bg-[#202225] hover:bg-[#2c2f33] text-[#dcddde] h-10 justify-start"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="ghost"
                className="w-full bg-[#202225] hover:bg-[#2c2f33] text-[#dcddde] h-10 justify-start"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-[#b9bbbe] text-xs">
            By logging in, you agree to Discord's{" "}
            <span className="text-[#00aff4] hover:underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-[#00aff4] hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

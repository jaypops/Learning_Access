"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "../../contexts/RouterContext"
import { useRouter } from "../../contexts/RouterContext"
import { useDiscord } from "@/contexts/DiscordContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ChevronDown } from "lucide-react"

export function RegisterPage() {
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useDiscord()
  const { navigate } = useRouter()

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration delay
    setTimeout(() => {
      dispatch({
        type: "LOGIN",
        payload: {
          id: "1",
          username: username || "newuser123",
          displayName: displayName || "New User",
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
            <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[#b9bbbe] text-xs font-bold uppercase tracking-wide mb-2">
                Email <span className="text-[#f04747]">*</span>
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
                Display Name
              </label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-[#202225] border-none text-[#dcddde] placeholder:text-[#72767d] focus:ring-0 h-10"
              />
            </div>

            <div>
              <label className="block text-[#b9bbbe] text-xs font-bold uppercase tracking-wide mb-2">
                Username <span className="text-[#f04747]">*</span>
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <div>
              <label className="block text-[#b9bbbe] text-xs font-bold uppercase tracking-wide mb-2">
                Date of Birth <span className="text-[#f04747]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="w-full bg-[#202225] border-none text-[#dcddde] h-10 px-3 rounded appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="text-[#72767d]">
                      Month
                    </option>
                    {months.map((month, index) => (
                      <option key={month} value={index + 1} className="bg-[#202225]">
                        {month}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#b9bbbe] pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className="w-full bg-[#202225] border-none text-[#dcddde] h-10 px-3 rounded appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="text-[#72767d]">
                      Day
                    </option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day} className="bg-[#202225]">
                        {day}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#b9bbbe] pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full bg-[#202225] border-none text-[#dcddde] h-10 px-3 rounded appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="text-[#72767d]">
                      Year
                    </option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year} className="bg-[#202225]">
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#b9bbbe] pointer-events-none" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium h-11 rounded"
            >
              {isLoading ? "Creating Account..." : "Continue"}
            </Button>

            <div className="text-xs text-[#72767d]">
              By registering, you agree to Discord's{" "}
              <span className="text-[#00aff4] hover:underline cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-[#00aff4] hover:underline cursor-pointer">Privacy Policy</span>.
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="login" className="text-[#00aff4] text-sm hover:underline">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login({ email, password })
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20 lg:py-0">
      <div className="absolute inset-0">
        <Image
          src="/images/city_map_pattern.png"
          alt="Map Pattern Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6">
        <div className="overflow-hidden rounded-[4rem] border border-white bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="flex min-h-[600px] flex-col lg:flex-row">
            <div className="flex flex-1 flex-col justify-center space-y-8 p-12 lg:p-24">
              <div>
                <p className="text-xl lg:text-2xl font-medium text-zinc-400">
                  Welcome! Enter your details to continue.
                </p>
              </div>

              <div className="w-full max-w-md space-y-6">
                {error && (
                  <div className="p-3 text-sm font-medium text-red-500 bg-red-50 border border-red-100 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-6 pb-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-1 text-lg bg-transparent border-b border-zinc-200 outline-none placeholder:text-zinc-400 focus:border-[#164E44] transition-colors"
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 px-1 text-lg bg-transparent border-b border-zinc-200 outline-none placeholder:text-zinc-400 focus:border-[#164E44] transition-colors"
                    />
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-zinc-300 rounded text-[#164E44] focus:ring-[#164E44] focus:ring-offset-0"
                      />
                      <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-700 transition-colors">
                        Remember me
                      </span>
                    </label>

                    <Link
                      href="#"
                      className="text-sm font-semibold cursor-pointer text-[#164E44] hover:text-[#1E6356] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 flex w-full cursor-pointer items-center justify-center h-14 rounded-full bg-[#164E44] text-white text-[1.05rem] font-semibold transition-all duration-300 hover:bg-[#123F37] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(22,78,68,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                   {loading ? "Logging in..." : "Log in"}
                  </button>
                </form>

                <p className="px-1 text-sm font-medium text-zinc-500">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold cursor-pointer text-[#164E44] hover:text-[#1E6356] transition-colors"
                  > Sign up
                  </Link>
                </p>

              </div>
            </div>
            <div className="flex flex-1 items-center justify-center pointer-events-none">
              <div className="relative w-full h-[500px] lg:h-[600px] -translate-x-12 lg:-translate-x-20">
                <Image
                  src="/images/logsign.svg"
                  alt="Login illustration"
                  fill
                  priority
                  className="object-contain scale-110 lg:scale-[1.2] lg:pl-12 pr-5"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
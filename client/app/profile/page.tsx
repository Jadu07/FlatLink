'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { Loader2, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-24 pb-20">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
      </div>
    )
  }

  return (
    <main className="relative min-h-screen w-full bg-zinc-50/50 pt-32 pb-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/city_map_pattern.png"
          alt="Map Pattern Background"
          fill
          className="object-cover opacity-[0.05]"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
            Personal info
          </h1>
          <p className="text-sm font-semibold text-zinc-500 mt-2">
            Manage your account details and session.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 border-b border-zinc-100 bg-zinc-50/30">
            <img
              src={`https://ui-avatars.com/api/?background=164E44&color=fff&name=${encodeURIComponent(user.name)}&size=256`}
              alt={user.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white shadow-sm object-cover shrink-0"
            />
            <div className="flex flex-col justify-center text-center sm:text-left">
              <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
                {user.name}
              </h2>
              <p className="text-sm font-semibold text-zinc-500 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center py-6 border-b border-zinc-50">
              <div className="w-full sm:w-48 text-[12px] font-bold text-zinc-400 uppercase tracking-[0.15em] shrink-0 mb-1 sm:mb-0">
                Legal Name
              </div>
              <div className="text-[16px] font-bold text-zinc-900">
                {user.name}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center py-6 border-b border-zinc-100">
              <div className="w-full sm:w-48 text-[12px] font-bold text-zinc-400 uppercase tracking-[0.15em] shrink-0 mb-1 sm:mb-0">
                Email Address
              </div>
              <div className="text-[16px] font-bold text-zinc-900">
                {user.email}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 pb-2">
              <div className="text-center sm:text-left flex flex-col justify-center">
                <p className="text-sm font-bold text-zinc-900 tracking-tight">
                  Active Session
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-1">
                  You are currently logged in on this device
                </p>
              </div>

              <button
                onClick={logout}
                className="flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-3.5 rounded-2xl bg-[#164E44] text-white text-[13px] font-black uppercase tracking-widest hover:bg-[#123F37] transition-all shadow-md shadow-[#164E44]/10 active:scale-[0.98]"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LogIn, UserPlus, Plus } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const avatarUrl = user 
    ? `https://ui-avatars.com/api/?background=164E44&color=fff&name=${encodeURIComponent(user.name)}&size=128`
    : ''

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center">
          <span className="text-3xl select-none">
            <span className="font-black text-[#164E44]">flat</span>
            <span className="font-light text-zinc-950">link</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 min-w-[200px] justify-end">
          {!mounted || loading ? (
            <div className="h-10 w-32 bg-zinc-50 rounded-full animate-pulse" />
          ) : !user ? (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Log in
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-[#164E44] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1E6356] transition-all shadow-lg shadow-[#164E44]/10 hover:shadow-[#164E44]/20"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/create-listing"
                className="flex items-center gap-2 rounded-full border border-[#164E44] px-5 py-2 text-sm font-bold text-[#164E44] hover:bg-[#164E44] hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Listing
              </Link>
              
              <Link href="/profile" className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-zinc-50 hover:ring-[#164E44] transition-all">
                <Image
                  src={avatarUrl}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LogIn, UserPlus, Plus, User, LogOut, ChevronDown, Compass } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { user, loading, logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const avatarUrl = user ? `https://ui-avatars.com/api/?background=164E44&color=fff&name=${encodeURIComponent(user.name)}&size=128` : ''

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
                href="/explore-listings"
                className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                <Compass className="w-4 h-4" />
                Explore
              </Link>

              <div className="w-px h-6 bg-zinc-200 mx-1 hidden sm:block" />

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
                href="/explore-listings"
                className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                <Compass className="w-4 h-4" />
                Explore
              </Link>
              <div className="w-px h-6 bg-zinc-200 mx-1 hidden sm:block" />


              <Link
                href="/create-listing"
                className="flex items-center gap-2 rounded-full border border-[#164E44] px-5 py-2 text-sm font-bold text-[#164E44] hover:bg-[#164E44] hover:text-white transition-all max-sm:hidden"
              >
                <Plus className="w-4 h-4" />
                Create Listing
              </Link>

              <div
                className="relative"
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setShowDropdown(false)}
              >
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100"
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-zinc-50">
                    <Image src={avatarUrl} alt={user.name} fill className="object-cover" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-zinc-50 mb-1">
                      <p className="text-sm font-bold text-zinc-950 truncate">{user.name}</p>
                      <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                    </div>

                    {[
                      { label: 'My Profile', Icon: User, href: '/profile' },
                      { label: 'Logout', Icon: LogOut, onClick: logout, danger: true }
                    ].map((item) => {
                      const Tag = item.href ? Link : 'button'
                      return (
                        <Tag
                          key={item.label}
                          href={item.href as string}
                          onClick={() => { setShowDropdown(false); item.onClick?.() }}
                          className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-zinc-600 hover:bg-zinc-50 hover:text-[#164E44] group'
                            }`}
                        >
                          <item.Icon className={`w-4 h-4 ${!item.danger && 'transition-colors group-hover:text-[#164E44]'}`} />
                          {item.label}
                        </Tag>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}
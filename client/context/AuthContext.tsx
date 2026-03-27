'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<any>(null)

const API = `${process.env.NEXT_PUBLIC_API_URL}/auth`

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (u) setUser(JSON.parse(u))
    setLoading(false)
  }, [])

  const request = async (path: string, body: any) => {
    const res = await fetch(`${API}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error')
    return data
  }

  const login = async (data: any) => {
    const res = await request('login', data)
    setUser(res.user)
    localStorage.setItem('user', JSON.stringify(res.user))
    localStorage.setItem('token', res.token)
    router.push('/')
  }

  const register = async (data: any) => {
    const res = await request('signup', data)
    setUser(res.user)
    localStorage.setItem('user', JSON.stringify(res.user))
    localStorage.setItem('token', res.token)
    router.push('/')
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)  
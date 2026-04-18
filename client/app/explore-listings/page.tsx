'use client'
import React, { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import ListingCard from '@/components/ListingCard'
import { Search, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const ListingsContent = () => {
    const searchParams = useSearchParams()
    const [listings, setListings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const urlQuery = searchParams.get('query')
        if (urlQuery) {
            setQuery(urlQuery)
            setPage(1)
        }
    }, [searchParams])

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true)
            try {
                const searchQuery = query ? `&search=${encodeURIComponent(query)}` : ''
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings?page=${page}&limit=20${searchQuery}`)
                const data = await response.json()
                setListings(data.listings || [])
                setTotalPages(data.pagination?.totalPages || 1)
            } catch (error) {
                console.error('Error fetching listings:', error)
            } finally {
                setLoading(false)
            }
        }
        
        const timeoutId = setTimeout(() => {
            fetchListings()
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [page, query])

    return (
        <main className="relative min-h-screen w-full bg-zinc-50/50 pt-24 pb-20">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image src="/images/city_map_pattern.png" alt="Map Pattern Background" fill className="object-cover opacity-[0.06]" priority />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-6">

                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-3xl font-black tracking-tight text-zinc-900">
                        Explore Listings
                    </h1>

                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search city..."
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                                setPage(1)
                            }}
                            className="h-10 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-[#164E44] focus:ring-2 focus:ring-[#164E44]/5 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-zinc-300" />
                    </div>
                ) : listings.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {listings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                        
                        {totalPages > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-4">
                                <button 
                                    disabled={page === 1}
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    className="px-5 py-2.5 rounded-xl border border-zinc-200 bg-white text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    Previous
                                </button>
                                <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest px-2">
                                    Page {page} of {totalPages}
                                </span>
                                <button 
                                    disabled={page === totalPages}
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    className="px-5 py-2.5 rounded-xl border border-zinc-200 bg-white text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-8 text-center text-zinc-500">
                        <p className="font-medium text-zinc-900">No flats found</p>
                        <p className="text-sm">Try a different city or check back later.</p>
                    </div>
                )}
            </div>
        </main>
    )
}

const ListingsPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
            </div>
        }>
            <ListingsContent />
        </Suspense>
    )
}

export default ListingsPage

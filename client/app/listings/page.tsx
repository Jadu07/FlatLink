'use client'
import React, { useEffect, useState } from 'react'
import ListingCard from '@/components/ListingCard'
import { Search, Loader2 } from 'lucide-react'

const ListingsPage = () => {
    const [listings, setListings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/listings')
                const data = await response.json()
                setListings(data.listings || [])
            } catch (error) {
                console.error('Error fetching listings:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchListings()
    }, [])

    const filtered = listings.filter(l =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.city.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-zinc-50/50 pt-24 pb-20">
            <div className="mx-auto max-w-7xl px-6">

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
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-10 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-[#164E44] focus:ring-2 focus:ring-[#164E44]/5 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-zinc-300" />
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {filtered.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-8 text-center text-zinc-500">
                        <p className="font-medium text-zinc-900">No flats found</p>
                        <p className="text-sm">Try a different city or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListingsPage

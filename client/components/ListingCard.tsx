'use client'
import React from 'react'
import { Bed, Bath, MapPin, MessageCircle, User, Users } from 'lucide-react'

interface ListingProps {
    listing: {
        id: string
        title: string
        price: number
        address: string
        city: string
        bedrooms: number
        bathrooms: number
        roomType: string
        propertyType: string
        images: string[]
        userName: string
        lookingForGender: string
    }
}

const ListingCard = ({ listing }: ListingProps) => {
    const [imgError, setImgError] = React.useState(false)
    const hasImage = listing.images && listing.images.length > 0 && !imgError

    return (
        <div className="flex h-44 overflow-hidden rounded-xl border border-zinc-200 bg-white">

            <div className="relative w-44 shrink-0 overflow-hidden bg-zinc-100">
                {hasImage ? (
                    <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-full w-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl">
                        🏠
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 min-w-0">

                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-zinc-900 leading-tight truncate">
                            {listing.title}
                        </h3>
                        <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                            {listing.roomType.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1 text-zinc-400">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="text-xs truncate">{listing.city}, {listing.address}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-zinc-400">
                        {listing.lookingForGender === 'ANY' ? <Users className="h-3 w-3 shrink-0" /> : <User className="h-3 w-3 shrink-0" />}
                        <span className="text-xs capitalize">
                            {listing.lookingForGender === 'ANY' ? 'Any' : listing.lookingForGender.toLowerCase()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-500">
                    <div className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" />
                        <span className="text-xs">{listing.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" />
                        <span className="text-xs">{listing.bathrooms} bath</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg font-black text-zinc-950">₹{listing.price.toLocaleString()}</span>
                        <span className="ml-1 text-xs text-zinc-400">/mo</span>
                    </div>

                    <button className="flex items-center gap-1.5 rounded-lg bg-[#164E44] px-3 py-1.5 text-xs font-semibold text-white">
                        <MessageCircle className="h-3.5 w-3.5" />
                        Chat
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ListingCard

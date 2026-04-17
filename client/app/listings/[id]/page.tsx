'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Bed, Bath, Users, Home, Maximize2, Loader2, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from "@/context/AuthContext"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

interface Listing {
  id: string
  title: string
  description: string
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
  createdAt: string
  amenities: string[]
}

const ListingDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [enquiring, setEnquiring] = useState(false)
  const [enquired, setEnquired] = useState(false)
  const [enquiryMessage, setEnquiryMessage] = useState("Hi! I'm interested in your place. Is it still available?")
  const [imgError, setImgError] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`)
        const data = await response.json()
        setListing(data.listing)
      } catch (error) {
        console.error('Error fetching listing:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchListing()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-24 pb-20">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white pt-24 pb-20">
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Listing Not Found</h2>
        <Link href="/explore-listings" className="text-[#164E44] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to explore
        </Link>
      </div>
    )
  }

  const slides = listing.images?.map(url => ({ src: url })) || []
  const images = listing.images || []

  const handleEnquire = async () => {
    if (!enquiryMessage.trim()) return
    
    if (!user) {
      router.push('/login')
      return
    }

    setEnquiring(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiries/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing?.id,
          name: user.name,
          email: user.email,
          phone: null,
          message: enquiryMessage
        })
      })

      if (response.ok) {
        setEnquired(true)
      } else {
        console.error('Failed to send enquiry')
      }
    } catch (error) {
      console.error('Error sending enquiry:', error)
    } finally {
      setEnquiring(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6">
          <Link href="/explore-listings" className="text-zinc-500 hover:text-zinc-900 flex items-center gap-2 w-fit mb-6 text-sm font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Explore all listings
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 leading-tight tracking-tight">{listing.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 font-semibold">
            <span className="flex items-center gap-1.5 underline decoration-zinc-300 underline-offset-4 cursor-pointer hover:text-zinc-900 transition-colors">
              <MapPin className="w-4 h-4" /> {listing.city}, {listing.address}
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="relative mb-12 group rounded-[1.5rem] overflow-hidden bg-zinc-100 h-[300px] sm:h-[400px] md:h-[500px]">
          {imgError || images.length === 0 ? (
             <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 border-2 border-dashed border-zinc-200">
                <span className="text-5xl md:text-7xl select-none opacity-20 mb-2">
                   <span className="font-black text-[#164E44]">flat</span>
                   <span className="font-light text-zinc-950">link</span>
                </span>
                <span className="text-sm md:text-base font-bold text-zinc-400 uppercase tracking-widest">No Image</span>
             </div>
          ) : (
            <div className={`grid h-full gap-2 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4 grid-rows-2'}`}>
              <div
                className={`${images.length > 1 ? 'md:col-span-2 row-span-2' : ''} relative cursor-pointer overflow-hidden group/img`}
                onClick={() => { setPhotoIndex(0); setOpen(true) }}
              >
                <img src={images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-[1.03]" onError={() => setImgError(true)} />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
              </div>

              {images.length > 1 && images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer overflow-hidden hidden md:block group/img"
                  onClick={() => { setPhotoIndex(idx + 1); setOpen(true) }}
                >
                  <img src={img} alt={`Photo ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-[1.03]" onError={() => setImgError(true)} />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          )}

          {!imgError && images.length > 0 && (
            <button
              onClick={() => setOpen(true)}
              className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md border border-zinc-200/50 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm hover:scale-105 transition-all text-zinc-900"
            >
              <Maximize2 className="w-4 h-4" /> Show all photos
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-8 mb-8">
              <div>
                <h2 className="text-2xl font-black text-zinc-900 mb-3 capitalize tracking-tight">
                  {listing.roomType.replace(/_/g, ' ').toLowerCase()} in {listing.propertyType.replace(/_/g, ' ').toLowerCase()}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-zinc-900 text-[15px]">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-zinc-400" /> {listing.lookingForGender === 'ANY' ? 'Any Gender' : listing.lookingForGender.toLowerCase()}</span>
                  <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-zinc-400" /> {listing.bedrooms} Beds</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-zinc-400" /> {listing.bathrooms} Baths</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-zinc-200 pb-8 mb-8">
              <img
                src={`https://ui-avatars.com/api/?background=164E44&color=fff&name=${encodeURIComponent(listing.userName || "User")}&size=128`}
                alt="Avatar"
                className="w-14 h-14 rounded-full ring-2 ring-zinc-100"
              />
              <div>
                <h3 className="text-lg font-bold text-zinc-900">{listing.userName || "User"}</h3>
                <p className="text-sm text-zinc-500">Listed on {new Date(listing.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <div className="mb-8 border-b border-zinc-200 pb-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">About this space</h3>
              <p className="text-zinc-600 leading-[1.8] whitespace-pre-wrap text-[15px]">
                {listing.description}
              </p>
            </div>

            {listing.amenities?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 tracking-tight">What this place offers</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {listing.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-3 text-zinc-700">
                      <Home className="w-[22px] h-[22px] text-zinc-400" />
                      <span className="capitalize text-[15px]">{amenity.replace(/_/g, ' ').toLowerCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enquiry Card - Fixed (Removed Sticky) */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white border border-zinc-200 rounded-3xl p-7 shadow-md">
              <div className="mb-6 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Monthly Rent</span>
                <div className="flex items-baseline gap-1 text-[#164E44]">
                  <span className="text-4xl font-black tracking-tighter">₹{listing.price.toLocaleString()}</span>
                  <span className="text-sm font-bold text-zinc-500">/ mo</span>
                </div>
              </div>

              <hr className="border-zinc-100 mb-6" />

              {!enquired && (
                <textarea
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  disabled={enquiring}
                  className="w-full text-[14px] resize-none outline-none border border-zinc-200/80 rounded-xl p-4 text-zinc-700 bg-white focus:border-[#164E44] focus:ring-1 focus:ring-[#164E44] transition-all disabled:opacity-60 mb-4"
                  rows={3}
                />
              )}

              <button
                disabled={enquiring || enquired || !enquiryMessage.trim()}
                onClick={handleEnquire}
                className={`w-full py-3.5 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 ${
                  enquired ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-[#164E44] text-white hover:bg-[#113a33] disabled:bg-zinc-100 disabled:text-zinc-400'
                }`}
              >
                {enquiring ? <Loader2 className="w-5 h-5 animate-spin" /> : enquired ? <><CheckCircle2 className="w-5 h-5" /> Enquiry Sent</> : <><Mail className="w-5 h-5" /> Enquire Now</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
      />
    </main>
  )
}

export default ListingDetailPage
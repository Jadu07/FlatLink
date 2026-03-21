'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'
import {
    MapPin, IndianRupee, Upload, X, Wifi, Tv, Wind,
    Zap, ShowerHead, Car, Flame, Refrigerator, CheckCircle2,
    Info, Image as ImageIcon, ListChecks, Building2,
    Phone, MoveRight, Users, Home
} from 'lucide-react'

const HIGHLIGHTS = ['Attached bathroom', 'Western toilets', 'Furnished', 'Power 24×7', 'Bills included', 'Gated society', 'No alcohol', 'Family friendly', 'Pet friendly', 'Near metro', 'Gym nearby', 'Housekeeping', 'Parking included', 'Balcony', 'Natural light', 'Quiet area']

const AMENITY_LIST = [
    { key: 'tv', label: 'TV', Icon: Tv },
    { key: 'fridge', label: 'Fridge', Icon: Refrigerator },
    { key: 'kitchen', label: 'Kitchen', Icon: Flame },
    { key: 'wifi', label: 'WiFi', Icon: Wifi },
    { key: 'ac', label: 'AC', Icon: Wind },
    { key: 'powerbackup', label: 'Power Backup', Icon: Zap },
    { key: 'geyser', label: 'Geyser', Icon: ShowerHead },
    { key: 'parking', label: 'Parking', Icon: Car },
]

function FormSection({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) {
    return (
        <div className="bg-white border border-zinc-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-zinc-100 pb-4">
                <Icon className="h-5 w-5 text-[#164E44]" strokeWidth={2} />
                <h2 className="text-lg font-bold tracking-tight text-zinc-900">{title}</h2>
            </div>
            <div className="space-y-6">{children}</div>
        </div>
    )
}

function Field({ label, children, required, hint }: { label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-[13px] font-semibold text-zinc-700">
                    {label}{required && <span className="ml-1 text-zinc-400 font-normal">*</span>}
                </label>
                {hint && <span className="text-[11px] text-zinc-400 font-medium">{hint}</span>}
            </div>
            {children}
        </div>
    )
}

function Input({ icon: Icon, className = '', ...props }: any) {
    return (
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />}
            <input {...props} className={`flex h-11 w-full rounded border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-all placeholder:text-zinc-300 focus:border-[#164E44] focus:ring-1 focus:ring-[#164E44]/10 ${Icon ? 'pl-10' : ''} ${className}`} />
        </div>
    )
}

function SelectBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button type="button" onClick={onClick} className={`h-10 flex-1 border px-4 text-[13px] font-semibold transition-all ${active ? 'bg-[#164E44] border-[#164E44] text-white shadow-sm' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'}`}>
            {label}
        </button>
    )
}

export default function CreateListingPage() {
    const [lookingFor, setLookingFor] = useState<'Male' | 'Female' | 'Any'>('Any')
    const [occupancy, setOccupancy] = useState<'Single' | 'Shared' | 'Any'>('Single')
    const [roomType, setRoomType] = useState<'PRIVATE' | 'SHARED' | 'ENTIRE_FLAT'>('PRIVATE')
    const [mobileVis, setMobileVis] = useState<'public' | 'private'>('public')
    const [selectedHighlights, setSelectedHighlights] = useState<string[]>([])
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [dragOver, setDragOver] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const toggleItem = (list: string[], item: string, setter: (val: string[]) => void) => setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item])

    const handleFiles = (files: FileList | null) => {
        if (!files) return
        setImageFiles(prev => [...prev, ...Array.from(files).slice(0, 5 - imageFiles.length)])
    }

    const uploadToCloudinary = async (file: File) => {
        const token = localStorage.getItem('token')
        const signRes = await fetch('http://localhost:8000/api/listings/sign-upload', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!signRes.ok) throw new Error('Failed to get upload signature')
        const { timestamp, signature } = await signRes.json()

        const formData = new FormData()
        formData.append('file', file)
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
        formData.append('timestamp', timestamp.toString())
        formData.append('signature', signature)
        formData.append('folder', 'FlatLink/Listings')

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        })
        
        if (!res.ok) throw new Error('Cloudinary upload failed')
        const data = await res.json()
        return data.secure_url
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        setStatus('Uploading images...')

        // Collect form data synchronously BEFORE any awaits — e.currentTarget becomes null after async boundaries
        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string
        const address = formData.get('address') as string
        const city = formData.get('city') as string
        const price = Number(formData.get('price'))
        const description = formData.get('description') as string

        try {
            const imageUrls = await Promise.all(imageFiles.map(file => uploadToCloudinary(file)))

            setStatus('Publishing...')
            const data = {
                title,
                address,
                city,
                price,
                description,
                lookingFor,
                occupancy,
                roomType,
                mobileVis,
                highlights: selectedHighlights,
                amenities: selectedAmenities,
                images: imageUrls
            }

            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:8000/api/listings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            const json = res.ok ? await res.json() : await res.json()
            setStatus(res.ok ? 'Success: Listing published.' : `Error: ${json?.message || 'Failed'}`)
        } catch (err) {
            console.error(err)
            setStatus('Error: Upload or creation failed.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-white pt-24 pb-32">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image src="/images/city_map_pattern.png" alt="Map Pattern Background" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-white/50" />
            </div>
            <div className="relative z-10 mx-auto max-w-5xl px-6">
                <div className="mb-12 border-b border-zinc-200 pb-10 text-center">
                    <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">
                        Add your <span className="text-[#164E44]">room</span>
                    </h1>
                </div>
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[{ t: 'PHOTOS', d: 'Use bright, clear images for 3x more views.' }, { t: 'PRICING', d: 'Research local rates to stay competitive.' }, { t: 'DETAILS', d: 'Mention landmarks and commute options.' }].map((tip, i) => (
                        <div key={i} className="border border-zinc-200 p-4 bg-white shadow-sm">
                            <p className="text-[10px] font-black text-[#164E44] tracking-widest uppercase mb-1">{tip.t}</p>
                            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed uppercase">{tip.d}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormSection title="INFORMATION" icon={Info}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Field label="TITLE" required><Input name="title" required placeholder="e.g. Spacious 2BHK Room" /></Field>
                            <Field label="LOCATION" required><Input name="address" icon={MapPin} required placeholder="Street / Area" /></Field>
                            <Field label="CITY" required><Input name="city" required placeholder="City name" /></Field>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Field label="PRICE (MONTHLY)" required><Input name="price" type="number" icon={IndianRupee} required placeholder="25000" /></Field>
                        </div>
                    </FormSection>
                    <FormSection title="PREFERENCES" icon={Users}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Field label="LOOKING FOR">
                                <div className="flex border border-zinc-100">
                                    <SelectBtn label="MALE" active={lookingFor === 'Male'} onClick={() => setLookingFor('Male')} />
                                    <SelectBtn label="FEMALE" active={lookingFor === 'Female'} onClick={() => setLookingFor('Female')} />
                                    <SelectBtn label="ANY" active={lookingFor === 'Any'} onClick={() => setLookingFor('Any')} />
                                </div>
                            </Field>
                            <Field label="OCCUPANCY">
                                <div className="flex border border-zinc-100">
                                    <SelectBtn label="SINGLE" active={occupancy === 'Single'} onClick={() => setOccupancy('Single')} />
                                    <SelectBtn label="SHARED" active={occupancy === 'Shared'} onClick={() => setOccupancy('Shared')} />
                                    <SelectBtn label="ANY" active={occupancy === 'Any'} onClick={() => setOccupancy('Any')} />
                                </div>
                            </Field>
                            <Field label="ROOM">
                                <div className="flex border border-zinc-100">
                                    <SelectBtn label="PRIVATE" active={roomType === 'PRIVATE'} onClick={() => setRoomType('PRIVATE')} />
                                    <SelectBtn label="SHARED" active={roomType === 'SHARED'} onClick={() => setRoomType('SHARED')} />
                                    <SelectBtn label="ENTIRE" active={roomType === 'ENTIRE_FLAT'} onClick={() => setRoomType('ENTIRE_FLAT')} />
                                </div>
                            </Field>
                        </div>
                    </FormSection>
                    <FormSection title="PHOTOS" icon={ImageIcon}>
                        <div className={`border border-dashed p-10 transition-all cursor-pointer text-center ${dragOver ? 'border-[#164E44] bg-[#164E44]/5' : 'border-zinc-300 bg-white hover:border-zinc-500 hover:bg-zinc-50'}`} onDragOver={e => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }} onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-6 w-6 text-zinc-400 mx-auto mb-3" />
                            <p className="text-[13px] font-bold text-zinc-900 uppercase">Upload Media</p>
                            <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-wider">JPG, PNG · 5 Images Max</p>
                            {imageFiles.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-3 mt-8">
                                    {imageFiles.map((f, i) => (
                                        <div key={i} className="relative h-20 w-20">
                                            <img src={URL.createObjectURL(f)} className="h-full w-full object-cover border border-zinc-200" alt="Preview" />
                                            <button type="button" onClick={e => { e.stopPropagation(); setImageFiles(prev => prev.filter((_, idx) => idx !== i)) }} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center bg-black text-white hover:bg-zinc-800 transition shadow"><X className="h-3 w-3" /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => handleFiles(e.target.files)} />
                    </FormSection>
                    <FormSection title="FEATURES" icon={ListChecks}>
                        <Field label="HIGHLIGHTS">
                            <div className="flex flex-wrap gap-2">
                                {HIGHLIGHTS.map(h => <button key={h} type="button" onClick={() => toggleItem(selectedHighlights, h, setSelectedHighlights)} className={`border px-4 py-2 text-[11px] font-bold uppercase transition-all ${selectedHighlights.includes(h) ? 'border-[#164E44] bg-[#164E44] text-white' : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400'}`}>{h}</button>)}
                            </div>
                        </Field>
                        <Field label="AMENITIES">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {AMENITY_LIST.map(({ key, label, Icon }) => <button key={key} type="button" onClick={() => toggleItem(selectedAmenities, key, setSelectedAmenities)} className={`flex flex-col items-center justify-center gap-2 border p-4 transition-all ${selectedAmenities.includes(key) ? 'border-[#164E44] bg-[#164E44]/5 text-[#164E44]' : 'border-zinc-100 bg-zinc-50/50 text-zinc-400 hover:border-zinc-300 hover:text-zinc-600'}`}><Icon className="h-4 w-4" strokeWidth={1.5} /><span className="text-[10px] font-bold uppercase tracking-wider">{label}</span></button>)}
                            </div>
                        </Field>
                    </FormSection>
                    <FormSection title="DETAILS" icon={Building2}>
                        <Field label="DESCRIPTION" required><textarea name="description" required rows={6} placeholder="Description of the listing..." className="w-full border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-300 focus:border-[#164E44] focus:ring-1 focus:ring-[#164E44]/10 resize-none" /></Field>
                        <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-900 uppercase"><Phone className="h-3.5 w-3.5 text-[#164E44]" /><span>VISIBILITY</span></div>
                                <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Public phone number</p>
                            </div>
                            <div className="flex border border-zinc-200">
                                <button type="button" onClick={() => setMobileVis('public')} className={`px-5 py-2 text-[11px] font-bold transition-all ${mobileVis === 'public' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-900'}`}>YES</button>
                                <button type="button" onClick={() => setMobileVis('private')} className={`px-5 py-2 text-[11px] font-bold transition-all ${mobileVis === 'private' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-900'}`}>NO</button>
                            </div>
                        </div>
                    </FormSection>
                    <div className="pt-10 flex flex-col items-center">
                        <button type="submit" disabled={submitting} className="w-full max-w-xs h-14 bg-zinc-950 text-white text-[13px] font-black uppercase tracking-[2px] transition-all hover:bg-[#164E44] active:scale-[0.98] disabled:opacity-50">{submitting ? 'PROCESSING...' : 'PUBLISH LISTING'}</button>
                        {status && <p className={`mt-6 text-[11px] font-black uppercase tracking-widest ${status.includes('Success') ? 'text-[#164E44]' : 'text-red-500'}`}>{status}</p>}
                    </div>
                </form>
            </div>
        </main>
    )
}
'use client'

import { useState } from 'react'

export default function CreateListingPage() {
    const [images, setImages] = useState<string[]>([''])
    const [amenities, setAmenities] = useState<string[]>([''])
    const [status, setStatus] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('Submitting...')

        const formData = Object.fromEntries(new FormData(e.currentTarget))

        const data = {
            ...formData,
            price: Number(formData.price),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            kitchens: Number(formData.kitchens),
            amenities: amenities.filter(a => a.trim()),
            images: images.filter(img => img.trim())
        }

        try {
            const res = await fetch('http://localhost:8000/api/listings/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            
            const json = await res.json()
            setStatus(res.ok ? `Listing created! ID: ${json.listing.id}` : `Error: ${json.message}`)
        } catch (err) {
            setStatus('Request failed')
        }
    }

    return (
        <div>
            <h1>Create Listing</h1>
            <form onSubmit={handleSubmit}>

                <label>User ID <br /><input name="userId" type="text" required /></label><br /><br />
                <label>Title <br /><input name="title" type="text" required /></label><br /><br />
                <label>User Name <br /><input name="userName" type="text" required /></label><br /><br />
                <label>Description <br /><textarea name="description" required /></label><br /><br />
                <label>Address <br /><input name="address" type="text" required /></label><br /><br />
                <label>City <br /><input name="city" type="text" required /></label><br /><br />

                <label>Price (₹/month) <br /><input name="price" type="number" required /></label><br /><br />
                <label>Bedrooms <br /><input name="bedrooms" type="number" required /></label><br /><br />
                <label>Bathrooms <br /><input name="bathrooms" type="number" required /></label><br /><br />
                <label>Kitchens <br /><input name="kitchens" type="number" required /></label><br /><br />

                <label>Property Type<br />
                    <select name="propertyType" required>
                        <option value="APARTMENT">Apartment</option>
                        <option value="HOUSE">House</option>
                        <option value="STUDIO">Studio</option>
                        <option value="LOFT">Loft</option>
                        <option value="PENTHOUSE">Penthouse</option>
                        <option value="OTHER">Other</option>
                    </select>
                </label><br /><br />

                <label>Room Type<br />
                    <select name="roomType" required>
                        <option value="PRIVATE">Private</option>
                        <option value="SHARED">Shared</option>
                        <option value="ENTIRE_FLAT">Entire Flat</option>
                        <option value="OTHER">Other</option>
                    </select>
                </label><br /><br />

                <label>Looking For Gender<br />
                    <select name="lookingForGender" required>
                        <option value="ANY">Any</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </label><br /><br />

                <label>Looking For Type<br />
                    <select name="lookingForType" required>
                        <option value="ROOMMATE">Roommate</option>
                        <option value="ROOM">Room</option>
                    </select>
                </label><br /><br />

                <fieldset>
                    <legend>Amenities</legend>
                    {amenities.map((a, i) => (
                        <div key={i}>
                            <input
                                type="text"
                                value={a}
                                placeholder="e.g. WiFi"
                                onChange={e => setAmenities(prev => prev.map((item, idx) => idx === i ? e.target.value : item))}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => setAmenities([...amenities, ''])}>+ Add Amenity</button>
                </fieldset><br />

                <fieldset>
                    <legend>Image URLs</legend>
                    {images.map((img, i) => (
                        <div key={i}>
                            <input
                                type="url"
                                value={img}
                                placeholder="https://..."
                                onChange={e => setImages(prev => prev.map((item, idx) => idx === i ? e.target.value : item))}
                                style={{ width: '400px' }}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => setImages([...images, ''])}>+ Add Image URL</button>
                </fieldset><br />

                <button type="submit">Create Listing</button>

            </form>

            {status && <p>{status}</p>}
        </div>
    )
}
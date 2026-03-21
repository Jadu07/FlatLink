import prisma from '../prisma'
import { PropertyType, RoomType, GenderPreference, ListingType } from '@prisma/client'

interface CreateListingData {
    title: string
    description: string
    address: string
    city: string
    price: number
    bedrooms: number
    bathrooms: number
    kitchens: number
    propertyType: string
    roomType: string
    lookingFor: string
    occupancy: string
    amenities: string[]
    images: string[]
    userId: string
}

const toGenderPref = (val: string): GenderPreference => {
    const map: Record<string, GenderPreference> = {
        Male: GenderPreference.MALE,
        Female: GenderPreference.FEMALE,
        Any: GenderPreference.ANY
    }
    return map[val] ?? GenderPreference.ANY
}

const toListingType = (occupancy: string): ListingType => {
    return occupancy === 'Shared' ? ListingType.ROOMMATE : ListingType.ROOM
}

const toPropertyType = (val: string): PropertyType => {
    const map: Record<string, PropertyType> = {
        APARTMENT: PropertyType.APARTMENT,
        HOUSE: PropertyType.HOUSE,
        STUDIO: PropertyType.STUDIO,
        LOFT: PropertyType.LOFT,
        PENTHOUSE: PropertyType.PENTHOUSE,
        OTHER: PropertyType.OTHER
    }
    return map[val] ?? PropertyType.OTHER
}

const toRoomType = (val: string): RoomType => {
    const map: Record<string, RoomType> = {
        PRIVATE: RoomType.PRIVATE,
        SHARED: RoomType.SHARED,
        ENTIRE_FLAT: RoomType.ENTIRE_FLAT,
        OTHER: RoomType.OTHER
    }
    return map[val] ?? RoomType.OTHER
}

class ListingService {
    async create(data: CreateListingData) {
        const user = await prisma.user.findUnique({
            where: { id: data.userId }
        })

        if (!user) {
            throw new Error('User not found')
        }

        const listing = await prisma.listing.create({
            data: {
                title: data.title,
                userName: user.name,                          // pulled from DB, not form
                description: data.description,
                address: data.address,
                city: data.city,
                price: data.price,
                bedrooms: Number(data.bedrooms) || 0,
                bathrooms: Number(data.bathrooms) || 0,
                kitchens: Number(data.kitchens) || 0,
                propertyType: toPropertyType(data.propertyType),
                roomType: toRoomType(data.roomType),
                lookingForGender: toGenderPref(data.lookingFor),
                lookingForType: toListingType(data.occupancy),
                amenities: data.amenities ?? [],
                images: data.images ?? [],
                userId: data.userId
            }
        })

        return listing
    }

    async getAll() {
        const listings = await prisma.listing.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        })
        return listings
    }
}

const listingService = new ListingService()
export default listingService

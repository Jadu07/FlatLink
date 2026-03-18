import prisma from '../prisma'
import { PropertyType, RoomType, GenderPreference, ListingType } from '@prisma/client'

interface CreateListingData {
    title: string
    userName: string
    description: string
    address: string
    city: string
    price: number
    bedrooms: number
    bathrooms: number
    kitchens: number
    propertyType: PropertyType
    roomType: RoomType
    lookingForGender: GenderPreference
    lookingForType: ListingType
    amenities: string[]
    images: string[]
    userId: string
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
                userName: data.userName,
                description: data.description,
                address: data.address,
                city: data.city,
                price: data.price,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                kitchens: data.kitchens,
                propertyType: data.propertyType,
                roomType: data.roomType,
                lookingForGender: data.lookingForGender,
                lookingForType: data.lookingForType,
                amenities: data.amenities,
                images: data.images,
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

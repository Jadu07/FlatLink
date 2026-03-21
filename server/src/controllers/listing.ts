import { Response } from 'express'
import listingService from '../services/listing'
import cloudinary from '../utils/cloudinary'
import { AuthRequest } from '../middleware/auth'

class ListingController {
    signUpload = async (req: AuthRequest, res: Response) => {
        try {
            const timestamp = Math.round(new Date().getTime() / 1000)
            const paramsToSign = { folder: 'FlatLink/Listings', timestamp }
            const signature = cloudinary.utils.api_sign_request(
                paramsToSign,
                process.env.CLOUDINARY_API_SECRET!
            )
            res.json({ timestamp, signature })
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Could not generate signature' })
        }
    }

    create = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.userId!
            const listing = await listingService.create({ ...req.body, userId })
            res.status(201).json({
                message: 'Listing created successfully',
                listing
            })
        } catch (error: any) {
            res.status(400).json({
                message: error.message || 'Failed to create listing'
            })
        }
    }

    getAll = async (req: AuthRequest, res: Response) => {
        try {
            const listings = await listingService.getAll()
            res.status(200).json({ listings })
        } catch (error: any) {
            res.status(500).json({
                message: error.message || 'Failed to fetch listings'
            })
        }
    }
}

const listingController = new ListingController()
export default listingController

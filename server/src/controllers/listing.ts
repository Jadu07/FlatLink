import { Request, Response } from 'express'
import listingService from '../services/listing'

class ListingController {
    create = async (req: Request, res: Response) => {
        try {
            const listing = await listingService.create(req.body)
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

    getAll = async (req: Request, res: Response) => {
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

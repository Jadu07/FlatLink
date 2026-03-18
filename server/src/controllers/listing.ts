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
}

const listingController = new ListingController()
export default listingController

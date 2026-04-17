import { Request, Response } from 'express'
import enquiryService from '../services/enquiry'
import { AuthRequest } from '../middleware/auth'

class EnquiryController {
    create = async (req: Request, res: Response) => {
        try {
            const enquiry = await enquiryService.create(req.body)
            res.status(201).json({
                message: 'Enquiry sent successfully',
                enquiry
            })
        } catch (error: any) {
            if (error.message === 'Listing not found') {
                return res.status(404).json({ message: error.message })
            }
            res.status(400).json({
                message: error.message || 'Failed to send enquiry'
            })
        }
    }


}

const enquiryController = new EnquiryController()
export default enquiryController

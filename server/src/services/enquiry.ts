import prisma from '../prisma'
import { sendEnquiryEmail, sendEnquirerAcknowledgmentEmail } from '../utils/mailer'

interface CreateEnquiryData {
    listingId: string
    name: string
    email: string
    phone?: string
    message: string
}

class EnquiryService {
    async create(data: CreateEnquiryData) {
        const listing = await prisma.listing.findUnique({
            where: { id: data.listingId },
            include: { user: true }
        })

        if (!listing) {
            throw new Error('Listing not found')
        }

        const enquiry = await prisma.enquiry.create({
            data: {
                listingId: data.listingId,
                name: data.name,
                email: data.email,
                phone: data.phone ?? null,
                message: data.message
            }
        })

        if (listing.user && listing.user.email) {
            const emailParams = {
                hostEmail: listing.user.email,
                hostName: listing.user.name,
                enquirerName: data.name,
                enquirerEmail: data.email,
                enquirerPhone: data.phone ?? null,
                listingTitle: listing.title,
                message: data.message
            }
            
            Promise.all([
                sendEnquiryEmail(emailParams),
                sendEnquirerAcknowledgmentEmail(emailParams)
            ]).catch(err => console.error('Failed to dispatch background emails', err))
        }

        return enquiry
    }


}

const enquiryService = new EnquiryService()
export default enquiryService

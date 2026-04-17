import { Router } from 'express'
import enquiryController from '../controllers/enquiry'
import { authMiddleware } from '../middleware/auth'

class EnquiryRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/create', enquiryController.create)
    }

    public getRouter() {
        return this.router
    }
}

const enquiryRoutes = new EnquiryRoutes()
export default enquiryRoutes

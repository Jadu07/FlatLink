import { Router } from 'express'
import listingController from '../controllers/listing'
import { authMiddleware } from '../middleware/auth'

class ListingRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get('/sign-upload', listingController.signUpload)
        this.router.post('/create', authMiddleware, listingController.create)
        this.router.get('/', listingController.getAll)
    }

    public getRouter() {
        return this.router
    }
}

const listingRoutes = new ListingRoutes()
export default listingRoutes

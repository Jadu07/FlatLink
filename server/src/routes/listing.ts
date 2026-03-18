import { Router } from 'express'
import listingController from '../controllers/listing'

class ListingRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/create', listingController.create)
    }

    public getRouter() {
        return this.router
    }
}

const listingRoutes = new ListingRoutes()
export default listingRoutes

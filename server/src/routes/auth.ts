import { Router } from 'express'
import authController from '../controllers/auth'

class AuthRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/signup', authController.signup)
        this.router.post('/login', authController.signin)
    }

    public getRouter() {
        return this.router
    }
}

const authRoutes = new AuthRoutes()
export default authRoutes

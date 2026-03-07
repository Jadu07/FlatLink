import { Request, Response } from 'express'
import authService from '../services/auth'

class AuthController {
    signup = async (req: Request, res: Response) => {
        try {
            const result = await authService.register(req.body)
            res.status(201).json({
                message: 'User registered successfully',
                ...result
            })
        } catch (error: any) {
            res.status(400).json({
                message: error.message || 'Registration failed'
            })
        }
    }

    signin = async (req: Request, res: Response) => {
        try {
            const result = await authService.login(req.body)
            res.status(200).json({
                message: 'Login successful',
                ...result
            })
        } catch (error: any) {
            res.status(401).json({
                message: error.message || 'Login failed'
            })
        }
    }
}
const authController = new AuthController()
export default authController

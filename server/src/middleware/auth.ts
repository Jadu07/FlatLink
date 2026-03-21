import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    userId?: string
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' })
        return
    }

    const token = authHeader.slice(7) 
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' })
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as unknown as { userId: string }
        req.userId = decoded.userId
        next()
    } catch {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' })
    }
}

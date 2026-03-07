import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'

class AuthService {
    private readonly saltRounds = 10
    private readonly jwtSecret = process.env.JWT_SECRET || 'fallback_secret'

    async register(userData: any) {
        const { email, password, name } = userData
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw new Error('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, this.saltRounds)

        const newUser = await prisma.user.create({
            data: { email,password: hashedPassword, name }
        })

        const token = jwt.sign({ userId: newUser.id }, this.jwtSecret, { expiresIn: '1d' })

        return { user: { id: newUser.id, email: newUser.email, name: newUser.name }, token }
    }

    async login(credentials: any) {
        const { email, password } = credentials
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) { throw new Error('Invalid credentials') }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) { throw new Error('Invalid credentials') }
        
        const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '1d' })

        return { user: { id: user.id, email: user.email, name: user.name }, token }
    }
}

const authService = new AuthService()
export default authService

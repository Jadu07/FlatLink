import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import listingRoutes from './routes/listing'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes.getRouter())
app.use('/api/listings', listingRoutes.getRouter())

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' })
})

export default app

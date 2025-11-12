import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { ratesRouter } from './routes/rates'
import { subscribeRouter } from './routes/subscribe'
import { logger } from './utils/logger'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true }))

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/api', ratesRouter)
app.use('/api', subscribeRouter)

// logger middleware
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const ms = Date.now() - start
    logger.info(`${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`)
  })
  next()
})

const port = Number(process.env.PORT || 4000)
app.listen(port, () => logger.info(`API ready on http://localhost:${port}`))

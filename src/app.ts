import 'dotenv/config'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import { ratesRouter } from './routes/rates'
import { subscribeRouter } from './routes/subscribe'
import { logger } from './utils/logger'

const app = express()

app.use(helmet({ crossOriginResourcePolicy: false }))

app.use(express.json())

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const ms = Date.now() - start
    logger.info(`${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`)
  })
  next()
})

const allowList = (process.env.CORS_ORIGIN?.split(',').map(s => s.trim()).filter(Boolean)) ?? []
const corsOptions: CorsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true)

    if (allowList.includes(origin)) return cb(null, true)

    try {
      const host = new URL(origin).host
      if (/\.vercel\.app$/.test(host)) return cb(null, true)
    } catch {
    }

    return cb(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) 
app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/api', ratesRouter)
app.use('/api', subscribeRouter)

const port = Number(process.env.PORT || 4000)
app.listen(port, () => logger.info(`API ready on http://localhost:${port}`))

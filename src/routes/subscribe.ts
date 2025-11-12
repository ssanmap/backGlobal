import { Router } from 'express'
import { subscribe } from '../controllers/subscribeController'
export const subscribeRouter = Router()
subscribeRouter.post('/subscribe', subscribe)

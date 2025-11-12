import { Router } from 'express'
import { getRates } from '../controllers/ratesController'
export const ratesRouter = Router()
ratesRouter.get('/rates', getRates)

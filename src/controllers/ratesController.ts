import { Request, Response } from 'express'
import { logger } from '../utils/logger'

const MOCK = { base: 'USD', rates: { CLP: 987.62, PEN: 3.81, USD: 1 } }

export function getRates(req: Request, res: Response) {
  const base = (req.query.base as string) || 'USD'
  const target = (req.query.target as string) || 'CLP'

  logger.info('GET /rates params', { base, target })

  const value = (MOCK.rates as any)[target]
  if (!value) {
    logger.error('Unsupported currency', { target })
    return res.status(400).json({ message: `Unsupported target currency: ${target}` })
  }

  const asOf = new Date('2025-10-31T17:51:00Z').toISOString()
  const payload = { base, rates: { [target]: value }, asOf }

  logger.info('GET /rates response', payload)
  return res.json(payload)
}

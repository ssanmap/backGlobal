import { Request, Response } from 'express'
import { z } from 'zod'
import { logger } from '../utils/logger'
import { appendSubscriberRow } from '../utils/sheets'

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

export async function subscribe(req: Request, res: Response) {
  const parsed = Schema.safeParse(req.body)
  if (!parsed.success) {
    logger.error('POST /subscribe invalid', parsed.error.issues)
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.issues })
  }

  try {
    const sheetId = process.env.GOOGLE_SHEETS_ID
    if (!sheetId) throw new Error('Missing GOOGLE_SHEETS_ID')

    const item = { ...parsed.data, createdAt: new Date().toISOString(), source: 'web' }

    await appendSubscriberRow({
      spreadsheetId: sheetId,
      row: [item.name, item.email, item.createdAt, item.source],
    })

    logger.info('POST /subscribe stored in sheet', { email: item.email })
    return res.status(201).json({ ok: true })
  } catch (err: any) {
    logger.error('Sheets error', err?.message || err)
    return res.status(500).json({ ok: false, message: 'Failed to store lead' })
  }
}

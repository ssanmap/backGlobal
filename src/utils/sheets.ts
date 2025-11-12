import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function getCreds() {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL
  let private_key = process.env.GOOGLE_PRIVATE_KEY

  if (!client_email || !private_key) {
    throw new Error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY')
  }

  // Normaliza saltos de línea si vienen con \n
  if (private_key.includes('\\n')) {
    private_key = private_key.replace(/\\n/g, '\n')
  }

  return { client_email, private_key }
}

export async function appendSubscriberRow({
  spreadsheetId,
  row,
  sheetRange = 'Leads!A1',
}: {
  spreadsheetId: string
  row: (string | number)[]
  sheetRange?: string
}) {
  const { client_email, private_key } = getCreds()

  // Autenticación con credenciales inline (sin archivo)
  const auth = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: SCOPES,
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetRange,
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  })
}

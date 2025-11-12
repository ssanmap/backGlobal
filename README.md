# 🌍 Global66 – Backend API

API backend construida en **Node.js + TypeScript + Express**, diseñada para entregar los valores de tipo de cambio y gestionar suscripciones desde una hoja de cálculo de **Google Sheets**.  
Forma parte del proyecto **Global66** junto al frontend desplegado en Vercel.

---

## 🚀 Stack Tecnológico

- **Node.js + Express**
- **TypeScript**
- **Helmet** → Seguridad HTTP
- **CORS** → Control de orígenes permitidos (Vercel y localhost)
- **Google Sheets API**
- **Render** → Despliegue backend
- **Vercel** → Despliegue frontend

---

## ⚙️ Configuración Local

### 1️⃣ Clonar el proyecto

```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
cd backend
npm install
Crear archivo .env

Ejemplo de configuración:

PORT=4000
CORS_ORIGIN=http://localhost:3000,https://front-global-flax.vercel.app
GOOGLE_SHEETS_ID=1r07xEtEslaThu9pfOShy6gjYlWgNyHKm-RraeIEtW0s
GOOGLE_CLIENT_EMAIL=sheets-writer@sheetgcp.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_LLAVE_AQUI\n-----END PRIVATE KEY-----\n"

npm run dev

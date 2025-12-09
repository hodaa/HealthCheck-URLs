import 'dotenv/config'
// import './dist/config/database.js'
import express, { Request, Response, NextFunction } from "express"
import swaggerUI from 'swagger-ui-express'

const app = express()

// Load modules dynamically
import usersRouter from './routes/users.js'
import checksRouter from './routes/checks.js'
import swaggerDocument  from '../docs/swagger.json' with { type: 'json' }

// Enable CORS for all routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', usersRouter)

app.use('/api/v1/checks', checksRouter)

if (swaggerDocument && Object.keys(swaggerDocument).length > 0) {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
}

app.get('/', async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }
  try {
    res.send(healthcheck)
  } catch (e) {
    healthcheck.message = (e as Error).message; 
    res.status(503).send()
  }
})


export default app

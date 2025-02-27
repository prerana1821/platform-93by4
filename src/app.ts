import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from './config/corsOptions'
import log from './utils/logger'
import { makeConnection } from './db/mongodb'
import authRoutes from './routes/AuthRoutes'
import studentRoutes from './routes/StudentRoutes'
import path from 'path'
dotenv.config()

makeConnection()

const app: Application = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

/**
 * Route Configuration
 * */
app.use(express.static(path.join(__dirname, '..', 'client', 'out')))

app.use('/api/auth', authRoutes)
app.use('/api', studentRoutes)

/**
 * This handles all the errors in application that were not catched by controllers
 * */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    log.error(err.stack)
  }

  res.status(500).json({
    message: err.message,
  })
})
/**
 * This route handles all 404 routes
 * */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    msg: 'Requested resource was not found on the server.',
  })
  next()
})

/**
 * Boots the app on PORT mentioned in .env
 * */
// if (process.env.NODE_ENV === 'development') {
//   app.listen(process.env.PORT, () => {
//     log.info(`[server] ->🚀 started on ${process.env.PORT}`)
//     log.warn(`⚠️ Make sure to use "yarn serve" in production.`)
//     log.info(
//       `[${process.env.NODE_ENV}] -> http://localhost:${process.env.PORT}`
//     )
//   })
// }

/**
 * This helps us debug better incase of unhandledRejection of any promise.
 * */
process.on('unhandledRejection', (error: Error) => {
  log.error(`❎ unhandledRejection : ${error} \n ErrorStack : ${error.stack}`)
})

/**
 * Any exception we forgot to catch will be logged here.
 * */
process.on('uncaughtException', (error: Error) => {
  log.error(`❎ uncaughtException :  ${error.stack}`)
})

export = app

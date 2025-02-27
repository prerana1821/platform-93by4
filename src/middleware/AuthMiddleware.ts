import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { AuthRequest } from '../types/RequestWithUser'
import { TokenUser } from '../utils/authUtils'
import log from '../utils/logger'

export async function requiresAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response<unknown, Record<string, unknown>> | undefined> {
  const cookie = req.cookies

  if (!cookie) {
    return res.status(401).json({
      msg: 'You are unauthorized to perform this action.',
      success: false,
    })
  }

  const { token } = cookie

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'You are not authorized to do that.',
    })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const decodedUser = <TokenUser>jwt.verify(token, process.env.JWT_SECRET!)
    console.log(decodedUser)
    const user = await User.findById(decodedUser.sub)

    log.info(user)

    if (!user) {
      return res.status(404).json({
        msg: 'Token is invalid.',
        success: false,
      })
    }

    req.user = user

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      msg: 'You are not authorized to access this resource',
    })
  }
}

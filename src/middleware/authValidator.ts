import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const config = process.env

interface CustomJwtPayload extends JwtPayload {
  user_id: string
  email: string
}

interface CustomRequest extends Request {
  user?: CustomJwtPayload
}

export  const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.token as string

  if (!token) {
    return res.status(403).send({ message: 'Token is required for authentication' })
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY || 'secret') as CustomJwtPayload
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

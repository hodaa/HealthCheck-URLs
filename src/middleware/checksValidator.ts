import { Request, Response, NextFunction } from 'express'

export const validateChecks = (req: Request, res: Response, next: NextFunction) => {
  const url = req.body.url
  if (!url) {
    return res.status(422).send({ message: 'URL is required' })
  }
  return next()
}

import Report from '../models/report.js'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user.js'
const config = process.env

interface CustomJwtPayload extends JwtPayload {
  user_id: string
  email: string
}

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const get = (req: any, res: any, next: any) => {
  User.findOne({ confirmation_code: req.params.confirmation_code })
    .then((user: any) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }
      user.status = 'Active'
      user.confirmation_code = null
      user.save((err: any) => {
        if (err) {
          res.status(500).send({ message: err })
        }
        return res.status(200).send({ message: 'Your email is activated' })
      })
    })
    .catch((e: any) => console.log('error', e))
}

/**
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const create = async (req: any, res: any) => {
  const user = jwt.verify(req.headers.token, config.TOKEN_KEY || 'secret') as CustomJwtPayload
  const data = req.body
  data.user_id = user.user_id

  const newCheck = new Report(data)

  newCheck.save((err: any, Check: any) => {
    if (err) {
      res.send(err)
    } else { // If no errors, send it back to the client
      res.status(201).json({ message: 'Report successfully added!', Check })
    }
  })
}

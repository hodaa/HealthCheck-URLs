import Check  from '../models/check.js'
import axios from 'axios'
import User from '../models/user.js'
import { create as createReport } from './reportService.js'

const fetchInterval = 6000

export const monitor = async (req?: any, res?: any) => {
  // console.log("in get checks");
  const checks = await Check.find()
  if (checks) {
      checks.forEach((element: any) => fetchUrlRecursively(element))
  }
  else {
      res.status(500).json({ message: "Error fetching checks",  error: checks });
  }
}

const fetchUrlRecursively = async (check: any) => {
  const user = await User.findById(check.user_id)

  // console.log(check)
  axios.get(check.url).then((res: any) => {
    let status = 'up'
  //   console.log(check.user_id)
    if (res.status !== 200) {
      status = 'down'
    //   emailService.sendEmail(user.email, 'Your server is Down', 'Please  notice your server is done')
    }
    createReport({ check: check.url, user_id: check.user_id, status })
  // }).catch((error) => {
    // console.log(error)
  })

  // setTimeout(() => {
  //   fetchUrlRecursively(check.url)
  // }, fetchInterval)
}

export default { monitor }

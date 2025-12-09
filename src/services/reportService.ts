
import Report from '../models/report.js'

export const create = (data: any) => {
  const newReport = new Report(data)
  newReport.save((err: any, Check: any) => {
    if (err) {
      console.log(err)
    } else { // If no errors, send it back to the client
    //   res.status(201).json({ message: 'Check successfully added!', Check })
      console.log('done')
    }
  })
}

export default { create }

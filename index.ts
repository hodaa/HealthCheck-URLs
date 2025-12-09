import http from 'http'
import app from "./dist/app.js";
import monitorService from './dist/services/monitorService.js'

const server = http.createServer(app)
const port = process.env.APP_PORT || 4000

server.listen(port, () => {
  monitorService.monitor()
  console.log(`Server running on port ${port}`)
})

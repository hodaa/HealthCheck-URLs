import express, { Router } from 'express'
import * as controller from '../controllers/checkController.js'
import * as auth from '../middleware/authValidator.js'
import * as validator from '../middleware/checksValidator.js'

const router: Router = express.Router()

router.get('/', controller.getChecks)
router.get('/:id', controller.getCheck)
router.post('/', [auth.verifyToken, validator.validateChecks], controller.postCheck)
router.delete('/:userId', auth.verifyToken, controller.deleteCheck)
router.put('/:id', auth.verifyToken, controller.updateCheck)

export default router

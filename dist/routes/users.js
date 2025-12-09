import express from 'express';
import * as controller from '../controllers/userController.js';
import * as validator from '../middleware/validator.js';
const router = express.Router();
router.post('/register', validator.validateRegister(), controller.register);
router.post('/login', validator.validateLogin(), controller.login);
router.get('/confirm/:confirmation_code', controller.verify);
export default router;

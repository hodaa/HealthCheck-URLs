const express = require('express');
import { get } from '../controllers/reportController';
import { verifyToken } from '../middleware/authValidator';
const router = express.Router();
router.get('/', verifyToken, get);
module.exports = router;

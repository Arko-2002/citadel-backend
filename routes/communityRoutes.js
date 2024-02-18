import express from 'express';
import {
    createCommunity,
    getCommunity,
    getAllCommunity,
} from '../controllers/communityController.js';
import { verifyToken } from '../middleware/jwt.js';
const router = express.Router();

router.get('/', getAllCommunity);
router.get('/:id', getCommunity);
router.post('/', verifyToken, createCommunity);
export default router;

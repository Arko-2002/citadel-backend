import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.get('/:postId', getComments);
router.post('/', verifyToken, addComment);

export default router;

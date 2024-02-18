import express from 'express';
import {
    createPost,
    filterPostByCategory,
    filterPostByCommunity,
    getAllPosts,
    getPost,
    updatePost,
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:postId', getPost);
router.get('/s/:subCategory', filterPostByCategory);
router.get('/c/:community', filterPostByCommunity);

router.post('/', verifyToken, createPost);
router.put('/', verifyToken, updatePost);
export default router;

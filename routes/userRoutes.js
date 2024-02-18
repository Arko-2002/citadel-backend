import express from 'express';
import User from '../models/userModel.js';
import { verifyToken } from '../middleware/jwt.js';
import {
    getUserAndCommunity,
    joinCommunity,
    leaveCommunity,
    likePost,
    unLikePost,
    dislikePost,
    unDislikePost,
    savePost,
    unSavePost,
    getUser,
} from '../controllers/userController.js';
const router = express.Router();

router.get('/:user', getUser);

router.post('/join', verifyToken, joinCommunity);
router.post('/leave', verifyToken, leaveCommunity);
router.post('/community', verifyToken, getUserAndCommunity);

router.post('/like', verifyToken, likePost);
router.post('/unLike', verifyToken, unLikePost);
router.post('/dislikePost', verifyToken, dislikePost);
router.post('/unDislikePost', verifyToken, unDislikePost);

router.post('/save', verifyToken, savePost);
router.post('/unsave', verifyToken, unSavePost);
export default router;

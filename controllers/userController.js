import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const getUser = async (req, res) => {
    try {
        let user = req.params.user;
        const result = await User.find({ userName: user })
            .populate('postsMade')
            .populate('postsLike');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const joinCommunity = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.userId,
            {
                $push: {
                    joinedCommunity: req.body.communityID,
                },
            },
            { new: true }
        );
        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        res.status(403).send(err.message);
    }
};

export const leaveCommunity = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.userId,
            {
                $pull: {
                    joinedCommunity: req.body.communityID,
                },
            },
            { new: true }
        );
        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        res.status(403).send(err.message);
    }
};

export const getUserAndCommunity = async (req, res) => {
    try {
        const result = await User.findById(req.userId).populate(
            'joinedCommunity'
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $inc: {
                likes: 1,
            },
        });

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $push: {
                    postsLike: req.body.postId,
                },
                $pull: {
                    postsDislike: req.body.postId,
                },
            },
            {
                new: true,
            }
        );
        res.status(201).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
};

export const unLikePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $inc: {
                likes: -1,
            },
        });

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $pull: {
                    postsLike: req.body.postId,
                },
            },
            {
                new: true,
            }
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const dislikePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $inc: {
                disLikes: 1,
            },
        });

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $push: {
                    postsDislike: req.body.postId,
                },
                $pull: {
                    postsLike: req.body.postId,
                },
            },
            {
                new: true,
            }
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const unDislikePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $inc: {
                disLikes: -1,
            },
        });

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $pull: {
                    postsDislike: req.body.postId,
                },
            },
            {
                new: true,
            }
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const savePost = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $push: {
                    postsSaved: req.body.postId,
                },
            },
            {
                new: true,
            }
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};
export const unSavePost = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $pull: {
                    postsSaved: req.body.postId,
                },
            },
            {
                new: true,
            }
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

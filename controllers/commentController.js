import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const getComments = async (req, res) => {
    try {
        let postId = req.params.postId;
        const post = await Post.findById(postId).populate('comments');
        res.status(200).json(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const addComment = async (req, res) => {
    try {
        const { _id, name, userName, avatar } = await User.findById(req.userId);

        const comment = new Comment({
            comment: req.body.comment,
            user: {
                _id,
                userName,
                avatar,
                name,
            },
        });
        const result = await comment.save();

        const post = await Post.findByIdAndUpdate(
            req.body.postId,
            {
                $push: {
                    comments: result._id,
                },
            },
            {
                new: true,
            }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

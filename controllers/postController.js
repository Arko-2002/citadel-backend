import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const createPost = async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            postBody: req.body.post ? req.body.post : '',
            user: req.userId,
            subCategory: req.body.subCategory ? req.body.subCategory : 'Others',
            community: req.body.community,
            postImage: req.body.postImage,
        });

        const result = await post.save();

        await User.findByIdAndUpdate(req.userId, {
            $push: {
                postsMade: result._id,
            },
        });
        res.status(201).json(result);
    } catch (err) {
        res.status(404).send(err.message);
    }
};
export const updatePost = async (req, res) => {
    try {
        console.log(req.body);
        if (req.userId != req.body.user) {
            res.status(400).send('login with correct info');
        } else {
            const { postId, ...rest } = req.body;
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    ...rest,
                },
                {
                    new: true,
                }
            );
            res.status(200).send(post);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('community')
            .populate('user')
            .sort({ updatedAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const getPost = async (req, res) => {
    try {
        let postId = req.params.postId;
        const posts = await Post.findById(postId)
            .populate('community')
            .populate('user');
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const filterPostByCategory = async (req, res) => {
    try {
        let subCategory = req.params.subCategory;
        const posts = await Post.find({
            subCategory: subCategory,
        })
            .populate('community')
            .populate('user')
            .sort({ updatedAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const filterPostByCommunity = async (req, res) => {
    try {
        let community = req.params.community;
        console.log(community);
        const posts = await Post.find({
            community: community,
        })
            .populate('community')
            .populate('user')
            .sort({ updatedAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

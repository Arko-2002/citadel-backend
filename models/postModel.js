import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        postBody: {
            type: String,
        },
        postImage: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        postVideo: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        likes: {
            type: Number,
            default: 0,
        },
        disLikes: {
            type: Number,
            default: 0,
        },
        subCategory: {
            type: String,
            default: 'Others',
        },
        community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post;

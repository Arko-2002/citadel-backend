import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: 'https://i.redd.it/ib7scrg5t7w61.png',
        },
        postsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        postsLike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        postsDislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],

        postsSaved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        userBanner: {
            type: String,
            default:
                'https://wpimg.pixelied.com/blog/wp-content/uploads/2021/08/03132815/relevant-elements-reddit-banner-size.jpg',
        },
        createdCommunity: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
        ],
        joinedCommunity: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;

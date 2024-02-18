import mongoose from 'mongoose';
const { Schema } = mongoose;

const userScehma = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: String,
    avatar: String,
    name: String,
});

const commentSchema = Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        user: userScehma,
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

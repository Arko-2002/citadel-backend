import mongoose from 'mongoose';
const { Schema } = mongoose;

const communitySchema = Schema(
    {
        communityName: {
            type: String,
            required: true,
        },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        subCategory: {
            type: String,
            default: 'Others',
        },
        communityID: {
            type: String,
            required: true,
            unique: true,
        },
        communityDescription: {
            type: String,
            required: true,
        },
        communityProfile: {
            type: String,
            default:
                'https://preview.redd.it/5es1lne1du261.png?width=640&crop=smart&auto=webp&s=e6eb0ee5710710000e4fbace119112de63324a38',
        },
        communityBanner: {
            type: String,
            default:
                'https://preview.redd.it/official-reddit-banners-v0-g9i03fsmwmq91.png?width=1200&format=png&auto=webp&s=b78740a53b9b71193dc433bf393b2385b578114a',
        },
    },
    {
        timestamps: true,
    }
);

const Community = mongoose.model('Community', communitySchema);

export default Community;

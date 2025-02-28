import mongoose, { Schema } from "mongoose";

const linkSchema =new Schema({
    hash: {
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
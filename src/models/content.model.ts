import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
    link:{
        type: String,
        default: ""
    },
    type:{
        type: String,
        default : ""
    },
    title:{
        type: String,
        required: true
    },
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Content = mongoose.model('Content', contentSchema);

export default Content;
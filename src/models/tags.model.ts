import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
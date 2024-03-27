import mongoose from "mongoose";

const keySchema = new mongoose.Schema({
    validKeys: [{
        type: Number,
        required: true
    }]
});
const key = mongoose.model("key", keySchema);
export default key;
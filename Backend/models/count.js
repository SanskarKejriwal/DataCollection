import mongoose from "mongoose";

const countSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 1,
  },
});
const Count = mongoose.model("Count", countSchema);
export default Count;

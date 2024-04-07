import mongoose from "mongoose";

const keySchema = new mongoose.Schema({
  validKey: 
    {
      
        type: Number,
        required: true,
      
    },
  
});
const Key = mongoose.model("Key", keySchema);
export default Key;

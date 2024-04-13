import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
    audioID: {
        type: Number,
        required: true
    },
    userList:[
        {
            name: {
                type: String,
                required: true
            },
            age: {
                type: String,
                enum :["20-29","30-39","40-49","50-59","60-69","> 70"],
                required: true
            },
            timeStamps:[
                {
                    startTime:{
                        type: Number,
                    },
                    endTime:{
                        type: Number,
                    }
                }
            ],
            gender: {
                type: String,
                enum: ["Male", "Female", "Other"],
                required: true
            },
            noise :{
                type: String,
                enum:["Clean","Noisy"],
                required: true,
                
            },
            isCoughPresent: {
                type: Boolean,
                required: true
            },
            coughCount: {
                type: Number,
                min: [0, 'Cough count cannot be negative'],
                default: 0
            } 
        }]
    
});

const Audio = mongoose.model("Audio", audioSchema);
export default Audio;

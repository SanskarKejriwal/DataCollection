import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
    audioID: {
        type: Number,
        required: true
    },
    userList: [
        {
            age: {
                type: Number,
                required: true,
                min: [12, 'Age must be at least 12 years'],
                max: [120, 'Age cannot exceed 120 years']
            },
            gender: {
                type: String,
                enum: ['Male', 'Female', 'Other'],
                required: true
            },
            address: {
                country: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                }
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
        }
    ]
});

const Audio = mongoose.model("Audio", audioSchema);
export default Audio;

import Audio from "../models/audio.js";
import Count from "../models/count.js";
import dotenv from 'dotenv';
import { S3Client ,GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();


export const getAudioById = async (req, res) => {
    const id  = req.params.id;

    try {
        const audio = await Audio.find();
        const finalAudio = audio.filter((audio) => audio.audioID === id);
        console.log(finalAudio);
        if(!finalAudio) return res.status(404).json({ message: "Audio not found" });

        return res.status(200).json(finalAudio);

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const getAllAudio = async (req, res) => {
    try {
        console.log("Inside getAllAudio");
        const audio = await Audio.find().populate('userList');
        console.log(audio);
        return res.status(200).json(audio);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};


export const postMetadata = async (req, res) => {
    const metadata = req.body;
    console.log(metadata);
    
    
    const audio = await Audio.find();
        const finalAudio = audio.filter((audio) => audio.audioID === metadata.audioID);
        console.log("final audio",finalAudio);
        if(finalAudio.length>0){
            console.log("Audio already exists");
            const count = await Count.find();
            await Count.findByIdAndUpdate(count[0]._id, { count: count[0].count+1 });
            await Audio.updateOne({audioID:metadata.audioID},{$push:{userList:metadata.userList}});
            return res.status(200).json({ message: "Audio updated" });
        }
        else{
            const newPost = new Audio(metadata);
            console.log("new post",newPost);
            try {
                await newPost.save();
                const count = await Count.find();
            await Count.findByIdAndUpdate(count[0]._id, { count: count[0].count+1 });
                // newPost is returned as response if the save is successfull
                return res.status(201).json(metadata);
            } catch (error) {
                
                return res.status(409).json({ message: error.message })
            }
    }
        // const newPost = new Audio(metadata);
    // try {
    //     await newPost.save();
    //     // newPost is returned as response if the save is successfull
    //     return res.status(201).json(metadata);
    // } catch (error) {
        
    //     return res.status(409).json({ message: error.message })
    // }
};

const CONNECTION_URL = process.env.MONGODB_URL;

const s3 = new S3Client({ region: 'eu-north-1',
    credentials: {
        accessKeyId: "AKIA47CRYP7TSKZQ5C37",
        secretAccessKey: "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"
    }

}

);

const getURL = async (key) => {

    const command= new GetObjectCommand({
        Bucket: "coswaraaudiofiles",
        Key:key
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    
    return url;
}

export const contributeAudio = async (req, res) => {

    const count = await Count.find();
    console.log("count",count);
   const url= await getURL(`${count[0].count}.wav`);
    console.log(url);
    return res.status(200).json({
        url: url,
        audioID: count
    });
}
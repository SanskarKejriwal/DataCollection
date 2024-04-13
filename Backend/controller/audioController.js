import Audio from "../models/audio.js";
import Key from "../models/key.js";
import dotenv from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

export const getAudioById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const audio = await Audio.find();
    const finalAudio = audio.filter((audio) => audio.audioID === id);
    if (finalAudio.length==0)
      return res.status(404).json({ message: "Audio not found" });

    return res.status(200).json(finalAudio);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllAudio = async (req, res) => {
  try {
    const audio = await Audio.find();
    return res.status(200).json(audio);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const postMetadata = async (req, res) => {
  const metadata = req.body;

  const audio = await Audio.find();
  const finalAudio = audio.filter(
    (audio) => audio.audioID === metadata.audioDetails.audioID
  );
    if (finalAudio.length>0 && finalAudio[0].userList?.length > 0) {
      await Audio.updateOne(
        { _id: finalAudio[0]._id },
        { $push: { userList: metadata.audioDetails.userList} }
      );
      await Key.findByIdAndDelete(metadata.keyDetails._id);
      return res.status(200).json({ message: "Audio updated" });
    }
   else {
    const newPost = new Audio(metadata.audioDetails);
    try {
      await newPost.save();
      await Key.findByIdAndDelete(metadata.keyDetails._id);
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }
};

const CONNECTION_URL = process.env.MONGODB_URL;
const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getURL = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "coswaraaudiofiles",
    Key: key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return url;
};

export const contributeAudio = async (req, res) => {
  const key = await Key.find();

  if(key.length==0)
    return res.status(404).json({ message: "No keys available" }
  );

  const randomKey = Math.random();

  const finalKey = key[Math.floor(randomKey * (key.length - 1))].validKey;

  const url = await getURL(`${finalKey}.wav`);

  return res.status(200).json({
    url: url,
    audio: key[Math.floor(randomKey * (key.length - 1))],
  });
};

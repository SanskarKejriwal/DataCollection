
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import audioRoutes from "./Routes/audioRoutes.js";
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = 5001;

console.log(CONNECTION_URL)

mongoose.connect("mongodb+srv://SanskarKejriwal:Sanskar1510@cluster0.xgjsyoc.mongodb.net/DataCollection?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))




 app.use(audioRoutes);

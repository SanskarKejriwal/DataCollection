import express from 'express';

import {getAudioById,postMetadata,getAllAudio,contributeAudio} from '../controller/audioController.js';  

const audioRoutes = express.Router();

audioRoutes.get('/audio/:id', getAudioById); 
audioRoutes.get('/audio', getAllAudio); 
audioRoutes.put('/submit', postMetadata); //tested
audioRoutes.get('/contribute', contributeAudio); //tested

export default audioRoutes;

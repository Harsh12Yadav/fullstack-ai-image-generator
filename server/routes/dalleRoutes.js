import express, { response } from 'express'
import * as dotenv from 'dotenv'
import OpenAI from 'openai';
import axios from 'axios';
import Post  from '../mongodb/models/post.js';

dotenv.config();

const router =express.Router();

// const configuration=new Configuration({
    
// })

//const openai= new OpenAI({apiKey:process.env.OPENAI_API_KEY,});

router.route('/').get((req,res)=>{
    res.send("Hello from Harsh ");
})

router.route('/').post(async(req,res)=>{
    try{
        const {prompt}=req.body;
      const response = await axios.post(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        
      }
    );
      const image = response.data?.artifacts?.[0]?.base64;
        if (!image) {
      return res.status(500).json({
        error: 'Image generation failed. No image data received.',
        stabilityResponse: response.data,
      });
    }

    res.status(200).json({ photo: image });
       

    }

        catch(error){
          console.error('❌ Error generating image:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Something went wrong with Stability API',
      details: error?.response?.data || error.message
    });
           
        }
    
})

export default router;
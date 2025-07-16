import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDb from './mongodb/connect.js';

dotenv.config();
  
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js'
const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

//render postRoutes
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async(req,res)=>{
    res.send('Hello from harsh'); 
})
//special try block for mongodb atlas database
const serverStart=async()=>{

    try{
        connectDb(process.env.MONGODB_URL);
          app.listen(8080,()=>console.log('Server has started on on port http://localhost:8080'))
    }
    catch(error){
        console.log(error);
         
    }

}
serverStart();
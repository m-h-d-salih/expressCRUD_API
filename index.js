import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import router from './src/router.js';
import mongoose from 'mongoose';

const app=express()
dotenv.config();
app.use(cors())
app.use(express.json())
app.use('/api',router)

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
 console.log(`connected to mongodb`)
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port=process.env.PORT || 4000
app.listen(port,()=>console.log(`server listening on ${port}`))
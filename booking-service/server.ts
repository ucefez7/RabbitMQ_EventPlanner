import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { consumeMessages } from './rabbitmq/consumerBook';
dotenv.config()
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
const MONGODB_URI = process.env.MONGODB_URI || '';
mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("connect to DB")
}).catch((error)=>{
    console.log(error)
})
consumeMessages()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


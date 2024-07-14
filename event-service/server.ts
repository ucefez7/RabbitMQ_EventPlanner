import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import { startConsumer } from './rabbitmq/userConsumer';
import router from './routes/eventRoute';
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser())
app.use('/event',router)
const MONGODB_URI = process.env.MONGODB_URI || '';
mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("connect to DB")
}).catch((error)=>{
    console.log(error)
})
startConsumer()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

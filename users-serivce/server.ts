import express from 'express';
import cors from 'cors';
import router from './routes/authRoute';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use('/auth', router);
const MONGODB_URI = process.env.MONGODB_URI || '';
mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("connect to DB")
}).catch((error)=>{
    console.log(error)
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

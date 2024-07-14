import mongoose, { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
    userId:string
    email: string;
}

const userSchema = new Schema<UserDocument>({
    userId:{
        type:String,
        required:true
    },
    email: { 
        type: String,
        required: true, 
        unique: true
     },
   
});

const UserData = mongoose.model<UserDocument>('UserData', userSchema);
export default UserData;

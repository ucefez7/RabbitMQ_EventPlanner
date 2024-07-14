import mongoose, { Schema, Document } from 'mongoose';

interface BookingDocument extends Document {
    eventId: string;
    userMail: string;
    date:Date
}

const BookingSchema = new Schema<BookingDocument>({
    eventId: { 
        type: String,
        required: true, 
        unique: true
     },
    userMail: { 
        type: String, 
        required: true 
    },
    date:{
        type:Date,
        required:true
    }
});

const Book = mongoose.model<BookingDocument>('Booking', BookingSchema);
export default Book;

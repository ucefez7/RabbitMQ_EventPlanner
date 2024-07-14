import mongoose,{Schema,Document} from "mongoose";

interface EventDocument extends Document{
    title:string,
    description:string,
    date:Date,
    location:string,
    createdBy:string,
    booked:boolean
}

const EventSchema = new Schema<EventDocument>({
    title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdBy: { type: String, ref: 'UserData', required: true }, 
  booked:{type:Boolean,default:false}
})

const EventData = mongoose.model<EventDocument>('eventData',EventSchema)
export default EventData;
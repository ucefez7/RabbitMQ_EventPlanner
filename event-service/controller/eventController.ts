import { Request,Response } from "express";
import Event from '../model/eventModel'
import User from '../model/userModel'
import { produceBooking } from "../rabbitmq/eventProducer";
interface CustomRequest extends Request {
    userId?: string;
}

export const events = async(req:CustomRequest,res:Response)=>{
    try {
        const events = await Event.find({})
        console.log(events,"events getting or not/")
        res.json(events)
    } catch (error) {
        console.log(error)
    }
}

export const eventCreate = async(req:CustomRequest,res:Response)=>{
    try {
        const {title,date,description,location} = req.body
        console.log(req.body,"checking",req.userId,"getting or not")
        const userMail = await User.findOne({userId:req.userId})
        console.log(userMail)
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            createdBy:userMail?.email
        })

        await newEvent.save()
        res.status(201).json({success:true})
    } catch (error) {
        console.log(error)
    }
}

export const booking = async (req: CustomRequest, res: Response) => {
    try {
        const { _id, createdBy } = req.body;

        await produceBooking({ _id, createdBy });

        await Event.findOneAndUpdate({ _id }, { booked: true });

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Error in booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


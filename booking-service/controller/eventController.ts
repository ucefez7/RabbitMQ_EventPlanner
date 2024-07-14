import {Request,Response} from 'express'
import Book from '../model/eventModel'

interface data{
    _id:string,
    createdBy:string
}
export const saveData = async(Data:data )=>{
    try {
       const {_id,createdBy} = Data
       const Bookdata = new Book({
        eventId:_id,
        userMail:createdBy,
        date:new Date()
       })
      await Bookdata.save()
    } catch (error) {
        console.log(error)
    }
}
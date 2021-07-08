const mongoose=require("mongoose");


const roomschema= new mongoose.Schema({
    totalSeats:{
        type:Number,
        required:true
    },
    roomName:{
        type:String,
        required:true
    },
    amenities:{
        type:String,
        required:true
    },
    price_1hrs:{
        type:Number,
        required:true
    },
    Booking:[{
        type:mongoose.Types.ObjectId,
        ref:"booking"
    }]},
    {timestamps:true},)

const room= mongoose.model("rooms",roomschema);

module.exports= room;

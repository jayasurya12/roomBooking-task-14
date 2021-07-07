const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    Customer_Name:{
        type:String,
        requirerd:true
    },
    startDate:{
        type:String,
        required:true
    },
    closeDate:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        require:true
    },
    closeTime:{
        type:String,
        required:true
    },
    roomID:{
        type:mongoose.Types.ObjectId,
        ref:"room"
    }
},
{timestamps:true})

const booked=mongoose.model("booking",bookingSchema);

module.exports=booked;

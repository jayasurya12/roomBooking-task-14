const router=require("express").Router();
const bookingModel=require("../../../models/bookingDetails");
const roomModel=require("../../../models/roomDetails");
const jwt=require("jsonwebtoken");
const room = require("../../../models/roomDetails");


router.get("/",(req,res)=>{
    res.send("it is a bookingUser Router")
})

router.post("/bookingAdd",async(req,res)=>{
    try {
        const userBook=await bookingModel(req.body);
        const roomCheck= await roomModel.findById({_id:req.body.roomID}); 
   
//////////////////////////////////////////////////////////////////////////////////////////////////////
        let current=new Date()
        let start =new Date(`${userBook.startDate} ${userBook.startTime}`)
        let close =new Date(`${userBook.closeDate} ${userBook.closeTime}`)
        console.log(start,close);
/////////////////////////////////////////////////////////////////////////////////////////////////////
        if(start == "Invalid Date"|| close == "Invalid Date"){
            res.json("Date not Valid")
        }
        else{
            if(start >= current && start < close){
                let mi=close-start
                let v=(mi/1000/60/60%24).toFixed(2);
                console.log(v);
                let price_1hr=1;
                if(price_1hr > v){
                    return res.json("Low duration put more then 1 hour")
                }        
                    if(roomCheck.Booking ==""){
                        const session= await bookingModel.startSession();
                        const booking=await bookingModel(req.body);
                        const bookingDetails= await booking.save({session:session});
                        const roomChecking= await roomModel
                            .findByIdAndUpdate(
                            {_id:booking.roomID},
                            {$addToSet:{Booking:bookingDetails.id}},
                            {new:true})
                            .session(session);

                        return res.json("successfull"); 
                       
                }
                if(roomCheck.Booking !=""){
                        let userMod=await bookingModel.find({_id:roomCheck.Booking})                    
                        let n= await userMod.find((data)=>{
                            let stD=new Date(`${data.startDate} ${data.startTime}`)
                            let clD=new Date(`${data.closeDate} ${data.closeTime}`)
                            console.log(stD.valueOf());
                            if(stD == start && close == clD && clD < startD ){
                                 res.json("This time booked")
                            }else{
                                if(close < stD){
                                    return true;
                                }
                            }
                            
                        })
                        if(roomCheck){
                                            
                           res.json("this is already booked") 
                        }else{
                            const session=await bookingModel.startSession();
                            const booking=await bookingModel(req.body);
                            const bookingDetails=await booking.save({session:session});
            
                            const roomChecking=await roomModel
                                .findByIdAndUpdate(
                                {_id:bookingDetails.roomID},
                                {$push:{Booking:bookingDetails._id}},
                                {new:true})
                                .session(session);  
                                res.json("successfull")  
                        }

                    res.json("wait")    
                }         
                    
            }
            else{
                res.json("date Expired")
            }
        }
        



        

    } catch (error) {
    res.json({msg:"not access",error})
    }
    })




router.get("/data",async(req,res)=>{
    try {
        const load =await bookingModel.find({}).populate("roomID");
        res.json(load)
    } catch (error) {
        res.json({msg:"error",error})
    }
})

module.exports=router;
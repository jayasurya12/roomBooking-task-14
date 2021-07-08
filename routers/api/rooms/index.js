const router=require("express").Router();
const bookingModel=require("../../../models/bookingDetails");
const roomModel=require("../../../models/roomDetails");
const room = require("../../../models/roomDetails");


router.get("/",(req,res)=>{
    res.send("it is a bookingUser Router")
})

router.post("/bookingAdd",async(req,res)=>{
    try {
        const userBook=await bookingModel(req.body);
        const roomCheck= await roomModel.findById({_id:req.body.roomID}); 

        async function booking(){ 
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
                
////////////////////////////------------request date and time----------------///////////////////////////////////
        let current=new Date()
        let start =new Date(`${userBook.startDate} ${userBook.startTime}`)
        let close =new Date(`${userBook.closeDate} ${userBook.closeTime}`)
        console.log(start,close);
////////////////////////////////------------------invalid date time-----------////////////////////////////////////////////////////////////////
       
        if(start == "Invalid Date"|| close == "Invalid Date"){
            res.json("Date not Valid")
        }
        else{
            if(start > current && start < close){
                let mi=close-start
                let v=(mi/1000/60/60%24).toFixed(2);
                console.log(v);
                let price_1hr=1;
////////////////////////////------------this is low duration replay----------------------//////////////////                
               
                if(price_1hr > v){
                    return res.json("Low duration put more then 1 hour")
                }   
////////////////////////-----------find room empty or not-----------------/////////////////////                     
                if(roomCheck.Booking.length == 0){
                   booking();
                }
///////////////////////---------------room booking array not empty -------------//////////////////                
                else {
                    let userMod=await bookingModel.find({_id:roomCheck.Booking})
                    let findThatDate =userMod.find((data)=>{
                        let stD=new Date(`${data.startDate} ${data.startTime}`)
                        let clD=new Date(`${data.closeDate} ${data.closeTime}`)
    
                            if(clD.valueOf() > start.valueOf() && stD.valueOf() < close.valueOf() ){
                                 return res.json(" same time and date already booked some One")                    
                            }
                        });
////////////////////////---------this is findThat Date and time  any booking available or not available ---------------                        
                        if(findThatDate){
                            return
                        }
///////////////////////-----------------this not available that date and time to booking a room-------////////////////                        
                        else{
                            
                            booking();////this function call is to booking a user room-----/////
                           }
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

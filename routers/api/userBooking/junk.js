                let mi=close-start
                let v=(mi/1000/60/60%24).toFixed(2);
                let price_1hr=1;
                if(price_1hr > v){
                    res.json("Low duration put more then 1 hour")
                }
                else{
                  
                    let bookingDatas=await bookingModel.find({_id:roomCheck.Booking})
                    let roomBookedCollection=bookingDatas.find((data)=>{
                    
                    let stD=new Date(`${data.startDate} ${data.startTime}`)
                    let clD=new Date(`${data.closeDate} ${data.closeTime}`)   
                    
                    if(stD == start && clD == close){
                        res.json("all ready booked that time and date")
                    }
                    })   
                }








                
                if(start >= current && start < close){
                        let mi=close-start
                        let v=(mi/1000/60/60%24).toFixed(2);
                        let price_1hr=1;
                        if(price_1hr > v){
                            res.json("Low duration put more then 1 hour")
                        }
                        else{
                        const session=await bookingModel.startSession();
                        const bookingDetails=await bookingModel.save({session:session});
        
                        const roomChecking=await roomModel
                        .findByIdAndUpdate(
                        {_id:bookingDetails.roomID},
                        {$push:{Booking:bookingDetails._id}},
                        {new:true});
                        res.json("successfull")
                        .session(session);                    
                          console.log(roomChecking)   
                    }
                }
                    else{
                        res.json("date expiresd")
                    }
                
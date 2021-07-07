const router=require("express").Router();
const roomModel=require("../../../models/roomDetails");

router.post("/roomAdd",async(req,res)=>{
    try {
        const session=await roomModel.startSession();
        const createRoom= new roomModel(req.body);
        const roomData=await createRoom.save({session:session});
        res.json({msg:"Successfully created rooms",roomData})
    } catch (error) {
        res.json({msg:error})
    }
})

router.get("/room",async(req,res)=>{
    try {
        const rooms=await roomModel.find({}).populate("Booking")
        res.json(rooms)
    } catch (error) {
        res.json({msg:"error",error})
    }
    
})


module.exports=router;

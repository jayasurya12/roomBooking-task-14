const router= require("express").Router();
const apiBooking=require("./api/userBooking");
const apiRoom=require("./api/rooms");

router.use("/booking",apiBooking);
router.use("/room",apiRoom)


module.exports=router;
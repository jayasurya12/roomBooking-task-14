const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
    const connect= await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false
    })
    console.log(`MongoDB ${connect.connection.host}`);
    }
    catch(err){
        console.log(err);
    }
}

module.exports=connectDB;
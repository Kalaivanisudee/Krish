const mongoose = require("mongoose");


const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected Successfully...");
    }
    catch(error){
        console.log("MongoDB Connection Error...")
    }
}
module.exports = dbConnection;
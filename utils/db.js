const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/event').then(()=>console.log("database is connected")).catch((e)=>console.log(e))
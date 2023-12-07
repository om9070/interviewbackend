const dotenv = require("dotenv");
dotenv.config({path:"./utils/.env"})
const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')
const cron = require("node-cron");
require("./utils/db")
const PORT = process.env.PORT
const CONNECTION_URL = process.env.CONNECTION_URL
const event = require("./models/event");
const findEmail=require("./middleware/auth")
const sendEmail=require("./utils/emailSender")

app.use(express.json());
app.use(cors("*"));
app.use(logger("dev"))


//routes
const indexRouter = require("./routes/index");
const userRoute = require("./routes/User")
const eventRoute = require("./routes/event");

app.use("/",indexRouter)
app.use("/user", userRoute);
app.use("/event", eventRoute);

cron.schedule("0 12 * * *", async function () { //it will work every day at 12 am.

  const getEventTast=await event.find();
  console.log(getEventTast.length)
  if(getEventTast.length){
    for (let index = 0; index < getEventTast.length; index++) {
          const currentDate = new Date();

          const specificDateString = getEventTast[index].date;

          const specificDate = new Date(specificDateString);

          const timeDifference = specificDate - currentDate;

          const totalHours = timeDifference / (1000 * 60 * 60);

          if(totalHours<24){
            const getEmail=await findEmail.findEmail(getEventTast[index].token)
            console.log(getEmail)
            const processEmail=await sendEmail.getemail(getEmail)

          }
      
    }

  }

})


app.listen(PORT, () =>
  console.log(`Server Running on Port:${PORT}`)
)

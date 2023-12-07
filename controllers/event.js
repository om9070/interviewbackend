const event = require("../models/event")

exports.updateEvent = async function (req, res) {
    try {
        let eventId = req.query._id;
        let newData=req.body;
        let id = {
            _id: eventId
          }
        let update = {
            $set: { ...newData }
          }
        let defaultSet = {
            new: true
          }
         const updateEvent = await event.findByIdAndUpdate(id, update, defaultSet);

         res.status(201).json({ message: 'EventUpdate successfully',status:1 });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        let eventId = req.query._id;
        const deleteEvent = await event.findByIdAndDelete({ _id:eventId });
        res.status(200).json({message:"event is deleted",status:1});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        console.log(req.body)
        const { title, description, status,date } = req.body;
        const token=req.token; // store for search valid user when use cron
        const userId=req.userId;
     
        const  eventRequest = new event({ title, description, status,date,token,userId });
    
        await eventRequest.save();

        res.status(201).json({ message: 'Event created successfully',status:1 });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'something went wrong' });
    }
};


exports.getAllEvent = async (req, res) => {
    try {
        const userId=req.userId;
     
        const  eventRequest = await event.find({userId});
    
        res.status(201).json({ message: 'Get All Event successfully',status:1 ,data:eventRequest});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'something went wrong' });
    }
};

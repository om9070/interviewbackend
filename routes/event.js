const express = require("express");
const router = new express.Router();
const eventController = require('../controllers/event')
const auth = require("../middleware/auth");

router.get('/getEvent',auth.auth,eventController.getAllEvent)
router.post('/createEvent', auth.auth,eventController.createEvent)
router.patch('/updateEvent', auth.auth, eventController.updateEvent) 
router.delete('/deleteEvent', auth.auth, eventController.deleteEvent)


module.exports = router;
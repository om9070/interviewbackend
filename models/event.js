const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        minLength:3,
        maxLength:50
    },
    description: {
        type: String,
        required:true,
        minLength:10,
        maxLength:5000
    },
    status: {
        type: String,
        enum : ["pending","completed"],
        default:"pending"
    },
    date: {
        type: Date,
        required:true
    },
    token:{
        type: String,
        required:true 
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
});

const event = mongoose.model('eventdata', eventSchema);

module.exports = event;

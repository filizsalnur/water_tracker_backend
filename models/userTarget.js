const mongoose = require('mongoose');


const userTargetSchema= new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true
    }

}, {
  timestamps: true

});

const  UserTarget= mongoose.model('UserTarget', userTargetSchema );

module.exports = UserTarget;


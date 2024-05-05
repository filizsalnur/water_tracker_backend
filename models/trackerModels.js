const mongoose = require('mongoose');


const waterConsumeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }

}, {
  timestamps: true

});

const  WaterConsume= mongoose.model('WaterConsume', waterConsumeSchema );

module.exports = WaterConsume;


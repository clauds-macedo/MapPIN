const mongoose = require('mongoose');

const PSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
        min: 5
    },
    
    description: {
        type: String,
        required: true,
        min: 5
    },

    rate: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    },

    latitude: {
        type: Number,
        require: true,
    },

    longitude: {
        type: Number,
        require: true,
    }

}, {timestamps:true} );

module.exports = mongoose.model("Pins", PSchema)
const mongoose = require('mongoose');

const USchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },

    email: {
        type: String,
        required: true,
        max: 55,
        unique: true
    },

    pass: {
        type: String,
        required: true,
        min: 6,
        max: 15,
    },
    
}, {timestamps:true} );

module.exports = mongoose.model("User", USchema)
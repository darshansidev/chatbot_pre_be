const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    contactNo: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    }
}, { timestamps: true, versionKey: false })


module.exports = mongoose.model("User", userSchema);
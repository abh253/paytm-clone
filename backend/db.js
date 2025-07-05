const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:RTj2Jp2mCQWAkY6Q@cluster0.ktsjk8w.mongodb.net/")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastname: {
        type:String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    
    },
    
});

export const User = mongoose.model('User', userSchema);
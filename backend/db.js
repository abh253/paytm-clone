import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://admin:RTj2Jp2mCQWAkY6Q@cluster0.ktsjk8w.mongodb.net/paytm-database")

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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

export const Account = mongoose.model('Account', accountSchema);
export const User = mongoose.model('User', userSchema);


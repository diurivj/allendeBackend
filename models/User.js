const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username:String,
    email:{
        type: String,
        required:true
    },
    photoURL:String,
    active: {
        type:Boolean,
        default:false
    },
    tokenToActive: String
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('User', userSchema);

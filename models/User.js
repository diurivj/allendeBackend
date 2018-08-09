const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    photoURL:String,
    active: {
        type: Boolean,
        default: false
    },
    tokenToActive: String,
    role: {
	    type:String,
	    enum:['admin', 'user'],
	    default:'user'
    },
    phoneNumber:{
        type: String,
        required: true,
        default:'Aqui va tu telefono'
    },
    contactName:{
        type: String,
        required: true,
        default:'Nombre de Contacto'
    },
    QRCode:{
        type: String,
        required: true,
        default:'Codigo QR'
    },
    creditAmount:{
        type: Number,
        required: true,
        default:0
    },
    creditDays:{
        type: Number,
        required: true,
        default:0
    },
    discount:{
        type: Number,
        required: true,
        default:0
    },
    RFC:{
        type: String,
        required: true
        ,
        default:'Aqui va el RFC'
    },
    razonSocial:{
        type: String,
        required: true,
        default:'Aqui va la Razon Social'
    },
    address:{
        type: String,
        required: true,
        default:'Aqui va la Direccion'
    },
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('User', userSchema);

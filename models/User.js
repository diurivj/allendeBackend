const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
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
    rfc:{
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
        required: false,
        default:'Aqui va la Direccion'
    },
    addressFiscal:{
        type: String,
        required: true,
        default:'Aqui va la Direccion'
    },
    area:{
        type:String,
        required:false
    },
    products:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    order:{
        type:Schema.Types.ObjectId,
        ref:'Order'
    },
    clients:{
        type:Schema.Types.ObjectId,
        ref:'Client'
    }
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('User', userSchema);

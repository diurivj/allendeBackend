const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  rfc: {
    type: String,
    required: true
  },
  razonSocial: {
    type: String,
    required: true
  },
  addressFiscal: {
    type: Number,
    required: true
  },
  address: {
    type:String,
    enum:['pending', 'delivered','on-road'],
    default:'pending'
  },
  area:{
    type:String
  },
  schedule:{

  },
  comments:{

  },
  status:{
	    type:String,
	    enum:['prospect', 'client','not-interested'],
	    default:'user'
  },

},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Client', clientSchema);
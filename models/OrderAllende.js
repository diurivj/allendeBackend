const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderAllendeSchema = new Schema({
  name: {
    type: Number,
    required: true
  },
  rfc: {
    type: Number,
    required: true
  },
  status: {
    type:String,
    enum:['pending', 'delivered','on-road'],
    default:'pending'
  },
  deliveryDate:{

  },
  QRCode:{

  },
  

},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('OrderAllende', OrderAllendeSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderClientSchema = new Schema({
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
  quote:{

  },
  total:{

  }
  

},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('OrderClient', OrderClientSchema);
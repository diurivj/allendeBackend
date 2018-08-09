const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  status: {
    type:String,
    enum:['pending', 'delivered','on-road'],
    default:'pending'
  },

},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Product', productSchema);
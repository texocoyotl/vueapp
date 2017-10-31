var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Order = new Schema({
  client: {
    type: String
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
},{
    collection: 'orders'
});

module.exports = mongoose.model('Order', Order);
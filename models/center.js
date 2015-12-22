var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

/**
 * User Schema
 */

var CenterSchema = new Schema({
  name: { type: String, default: '' },
  longitude: { type: Number, default: 0 },
  latitude: { type: Number, default: 0 },
  email: { type: String, default: '' },
  address: { type: String, default: ''},
  description: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  items: [{ type: Schema.ObjectId, ref: "Item" }]
});

CenterSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || 'name';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

mongoose.model('Center', CenterSchema);

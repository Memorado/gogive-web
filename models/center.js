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

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('Center', CenterSchema);

/**
 * Items Schema
 */

var ItemSchema = new Schema({
  name: { type: String, default: '' },
  category: { type:Schema.ObjectId, ref: "Category" },
  description: { type: String, default: '' },
  quantity: { type: String, default: '' },
  priority: { type: Number, default: 0 },
  due_date: { type: Date, default: Date.now },
  center: { type:Schema.ObjectId, ref: "Center", childPath: "items" }
});
ItemSchema.plugin(relationship, { relationshipPathName:'center' });

ItemSchema
  .virtual('priority_name')
  .get(function() {
    switch(this.priority) {
      case 0:
        return "Low Priority"
      case 1:
        return "Medium Priority"
      case 2:
        return "High Priority"
      default:
        return "Unknown Priority"
    }
  });


ItemSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('Item', ItemSchema);
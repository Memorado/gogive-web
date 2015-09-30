var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

/**
 * User Schema
 */

var CategorySchema = new Schema({
  englishName: { type: String, default: '' },
  germanName: { type: String, default: '' }
});

CategorySchema.statics = {

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

mongoose.model('Category', CategorySchema);

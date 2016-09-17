'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  createDate: Date
});

module.exports = mongoose.model('Category', CategorySchema);

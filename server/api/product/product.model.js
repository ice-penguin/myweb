'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  _category:{
  	type:String,
  	ref:'Category'
  },
  image:String,
  functions:[String],//前端输入多个功能特点用|隔开
  parameters:[{
  	name:String,
  	value:String
  }],//参数
  hotValue:Number,//推荐，热值排序字段
  createDate: Date
});

module.exports = mongoose.model('Product', ProductSchema);

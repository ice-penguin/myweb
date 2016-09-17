'use strict';

var User = require('../user/user.model');
var Product = require('./product.model');
var util = require('../../tool/util');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function (res, err) {
  return res.send(500, err);
};
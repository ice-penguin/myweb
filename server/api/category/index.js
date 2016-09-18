'use strict';

var express = require('express');
var controller = require('./category.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/:id', auth.hasRole('admin'), controller.destory);

module.exports = router;

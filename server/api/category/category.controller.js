'use strict';

var User = require('../user/user.model');
var Category = require('./category.model');
var Product = require('../product/product.model');
var util = require('../../tool/util');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function (res, err) {
  return res.send(500, err);
};

exports.create = function (req,res){
	var name = req.body.name;
	if(!name){
		return res.json(200,util.code301(language,"name"));
	}
	var obj={
		name:name,
		createDate:new Date()
	};
	Category.create(obj,function (err,category){
		if (err) { return handleError(res, err); }
		res.json(200,{
			category:category
		});
	});
};

exports.update = function (req,res){
	var id=req.params.id;
	var obj=_.pick(req.body,"name","image");
	Category.findById(id,function (err,category){
		if (err) { return handleError(res, err); }
		if (!category) {return res.json(200,util.code404(language,"category"));}
		category=_.assign(category,obj);
		category.save(function (err,category){
			if (err) { return handleError(res, err); }
			res.json(200,{
				category:category
			});
		});
	});
};

exports.index = function (req,res){
	var page = req.query.page || 1,
    	itemsPerPage = req.query.itemsPerPage || 100;
    	// _category = req.query._category,
    	// keyWrod = req.query.keyWrod;
    var condition={};
    // if(_category){
    // 	condition._category=_category;
    // }
    // if(keyWrod){
    // 	condition.name={'$regex' : '.*' + keyWrod + '.*',"$options":"$i"};
    // }
    var count=0;
    Category.find(condition)
    .count(function (err,c){
    	if (err) { return handleError(res, err); }
    	count=c;
    	Category.find(condition,{},{
    		skip:itemsPerPage*(page-1),
    		limit:itemsPerPage
    	})
    	.sort({createDate:-1})
    	.exec(function (err,categories){
    		if (err) { return handleError(res, err); }
    		res.json(200,{
    			categories:categories,
    			page:page,
    			count:count
    		});
    	});
    });
};

exports.show = function (req,res){
	var id = req.params.id;
	Category.findById(id,function (err,category){
		if (err) { return handleError(res, err); }
		if (!category) {return res.json(200,util.code404(language,"category"));}
		res.json(200,{
			category:category
		});
	});
};

exports.destory = function (req,res){
	var id = req.params.id;
	Category.findById(id,function (err,category){
		if (err) { return handleError(res, err); }
		if (!category) {return res.json(200,util.code404(language,"category"));}
		var condition={
			_category:category._id
		};

		Product.find(condition,function (err,products){
			if (err) { return handleError(res, err); }
			_.each(products,function (product){
				product=_.assign(product,{"$unset":{_category:1}});
				product.save();
			});
			category.remove(function (err,category){
				res.json(200,"delete success");
			});
		});
	});
};	
'use strict';

var User = require('../user/user.model');
var Product = require('./product.model');
var Category = require('../category/category.model');
var util = require('../../tool/util');
var _ = require('lodash');
var language;

var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function (res, err) {
  return res.send(500, err);
};

var checkParameters = function (parameters){
	var open = true;
	if(!parameters){
		return open;
	}
	_.each(parameters,function (parameter){
		if(!(parameter.name && parameter.value)){
			open = false;
			return false;
		}
	});
	return open;
};

//处理提示标签，前端输入多个功能特点,用|隔开
var getFucntions = function (functions){
	var arr=[];
	if(!functions){
		return arr;
	};
	var newString = "";
	var deal=function(arr,functions){
		var index=functions.indexOf('|');
		if(index>0){
			arr.push(functions.substr(0,index));
			newString=functions.substr(index+1);
			return deal(arr,newString);
		}else if(index==0){
			newString=functions.substr(index+1);
			return deal(arr,newString);
		}else{
			if(functions.length>0){
				arr.push(functions);
			}
			return arr;
		}
	}
	return deal(arr,functions);
};

exports.create = function (req,res){
	var name = req.body.name,
		image = req.body.image,
		hotValue = req.body.hotValue,
		functions = req.body.functions,//前端输入多个功能特点数组
		parameters = req.body.parameters,
		_category = req.body._category;
	if(!name){
		return res.json(200,util.code301(language,"name"));
	}
	if(!_category){
		return res.json(200,util.code301(language,"_category"));
	}
	if(isNaN(hotValue)){
		hotValue=0;
	}

	if(functions && !(functions instanceof Array)){
		return res.json(200,util.code302(language,"functions"));
	}

	if(!checkParameters(parameters)){
		return res.json(200,util.code302(language,"parameters"));
	}
	var obj={
		_category:_category,
		name:name,
		hotValue:hotValue,
		functions:functions || [],
		parameters:parameters || [],
		createDate:new Date()
	};
	if(image){
		obj.image = image;
	}

	Category.findById(_category,function (err,category){
		if (err) { return handleError(res, err); }
		if (!category) {return res.json(200,util.code404(language,"category"));}
		Product.create(obj,function (err,product){
			if (err) { return handleError(res, err); }
			res.json(200,{
				product:product
			});
		});
	});
	
};

exports.update = function (req,res){
	var id = req.params.id;
	var obj = _.pick(req.body,"name","image","_category","functions","parameters","hotValue");
	if(obj.hotValue&&isNaN(obj.hotValue)){
		return res.json(200,util.code402(language,"hotValue"));
	}
	if(obj.functions){
		obj.functions=getFucntions(obj.functions);
	}
	if(obj.functions && !(obj.functions instanceof Array)){
		return res.json(200,util.code402(language,"functions"));
	}
	if(obj.parameters&&!checkParameters(obj.parameters)){
		return res.json(200,util.code402(language,"parameters"));
	}
	var doUpdate = function(){
		Product.findById(id,function (err,product){
			if (err) { return handleError(res, err); }
			if (!product) {return res.json(200,util.code404(language,"product"));}
			product=_.assign(product,obj);
			product.save(function (err,product){
				if (err) { return handleError(res, err); }
				res.json(200,{
					product:product
				});
			});
		});
	};
	if(_category){
		Category.findById(_category,function (err,category){
			if (err) { return handleError(res, err); }
			if (!category) {return res.json(200,util.code404(language,"category"));}
			doUpdate();
		});
	}else{
		doUpdate();
	}
};

exports.index = function (req,res){
	var page = req.query.page || 1,
    	itemsPerPage = req.query.itemsPerPage || 100,
    	_category = req.query._category,
    	keyWrod = req.query.keyWrod,
    	sortBy = req.query.sortBy;//hotValue,默认为createDate
    var condition={};
    var sort={createDate:-1};
    if(_category){
    	condition._category=_category;
    }
    if(keyWrod){
    	condition.name={'$regex' : '.*' + keyWrod + '.*',"$options":"$i"};
    }
    if(sortBy=="hotValue"){
    	sort={hotValue:-1};
    }
    var count=0;
    Product.find(condition)
    .count(function (err,c){
    	if (err) { return handleError(res, err); }
    	count=c;
    	Product.find(condition,{},{
    		skip:itemsPerPage*(page-1),
    		limit:itemsPerPage
    	})
    	.populate("_category")
    	.sort(sort)
    	.exec(function (err,products){
    		if (err) { return handleError(res, err); }
    		res.json(200,{
    			products:products,
    			page:page,
    			count:count
    		});
    	});
    });
};

exports.show = function (req,res){
	var id = req.params.id;
	Product.findById(id)
	.populate("_category")
	.exec(function (err,product){
		if (err) { return handleError(res, err); }
		if (!product) {return res.json(200,util.code404(language,"product"));}
		res.json(200,{
			product:product
		});
	});
};

exports.destory = function (req,res){
	var id = req.params.id;
	Product.findByIdAndRemove(id,function (err,product){
		if (err) { return handleError(res, err); }
		if (!product) {return res.json(200,util.code404(language,"product"));}
		res.json(200,"delete success");
	});
};	
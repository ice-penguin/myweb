'use strict';

angular.module('mywebApp')
  .controller('AdminEditProductController', ['$scope', '$location', '$state','$stateParams','$cookieStore','Upload','Compress_ready','Category','Product',
    function ($scope, $location, $state,$stateParams,$cookieStore,Upload,Compress_ready,Category,Product) {
    var self = this;
    var _product=$stateParams._product;
    console.log(_product);
    
    var MAX = Math.pow(2, 32);
    var MIN = 1;

    var copyFunctions;
    var copyParameters;

    self.parameters_index;//状态管理，当前操作的param数组元素下标
    
    self.product={
    	name:null,
    	_category:null,//分类id
    	categoryName:null,//分类名
		image:null,//图片
		hotValue:null,//热值，可以用推荐，越大排序越前
		functions:[''],//功能与特点，
		parameters:[]//产品参数，name,value
    };



    var init=function (){
    	loadProduct();
    	loadCategory();
    };

    var loadCategory=function(){
        Category.index({isAll:'true',random:new Date().getTime()},function (data){
            self.categories=data.categories;
        },function(){

        });
    };

    var loadProduct = function (){
    	Product.index({id:_product},function (data){
    		self.product=data.product;
    		var category=self.product._category;
    		if(category){
    			self.product._category=category._id;
    			self.product.categoryName=category.name;
    		}
    		
    	});
    };

    var dealProduct = function(){
    	if(!self.product.name || self.product.name == ""){
    		delete self.product.name;
    	}
    	if(!self.product._category || self.product._category == ""){
    		delete self.product._category;
    	}
    	if(!self.product.image || self.product.image == ""){
    		delete self.product.image;
    	}
    	copyFunctions=_.clone(self.product.functions);
    	copyParameters=_.clone(self.product.parameters);
    	var functions=[];
    	_.each(self.product.functions,function (fun){
    		if(fun&&fun!=""){
    			functions.push(fun);
    		}
    	});
    	self.product.functions=functions;

    	var parameters=[];
    	_.each(self.product.parameters,function (parameter){
    		if(parameter.name&&parameter.name!=""&&parameter.value&&parameter.value!=""){
    			parameters.push(parameter);
    		}
    	});
    	self.product.parameters=parameters;
    };

    //上传aws
    self.upload = function (files) {

      var now = new Date().getTime();
      var nowStr = now.toString();
      var rand = (Math.floor(Math.random() * (MAX - MIN)) + MIN).toString();
      var randStr = rand.toString();

      if (files.length === 1) {
        var file = files[0];
        var filename = nowStr + '_' + randStr + '_' + file.name.replace(/[^0-9a-z\.]+/gi, '');
        var index=0;//尝试次数
        var doCompress=function(){
            Compress_ready.resizeFile(file).then(function(blob_data) {
                if(blob_data.size==0){
                    //尝试次数为1次，则再尝试压缩，否则报错
                    if(index==0){
                        index++;
                        return doCompress();
                    }else{
                        return alert(self.languagePack.error.imageError.compressError);
                    }
                }

                Upload.upload({
                    method: 'POST',
	                url: '/api/upload',
	                data: {file: blob_data, 'filename': filename}
                }).then(function (resp) {
	                if(resp.data.code!=700){
	                    return alert(resp.data.msg);
	                }
	                self.product.image=filename;
                }, function () {
                	alert("上传失败");
                }, function (evt) {
                  self.loaded = parseInt(100 * evt.loaded / evt.total, 10);
                });

            }, function(err_reason) {
              console.log(err_reason);
            });
        };

        doCompress();
        
      }
    };


    self.changCategory = function (category){
    	self.product._category = category._id;
    	self.product.categoryName = category.name;
    	self.showSelectBox = false;
    };

    //显示编辑框
    self.showEidtCell=function (parameter,index){
        self.showEdit=true;
        if(parameter){
            self.eidtparameter=_.clone(parameter);
        }else{
            self.eidtparameter={};
        }
        if(index||index==0){
    		self.parameters_index=index;
    	}
    };

    //关闭编辑框
    self.closeEditCell = function(){
    	self.parameters_index=null;
    	self.showEdit=false;
    };

    //保存修改结果，新增或者update
    self.saveParam=function(){

        if(self.parameters_index!=null){
          self.product.parameters[self.parameters_index]=self.eidtparameter;
        }else{
          self.product.parameters.push(self.eidtparameter);  
        }
        self.showEdit=false;
        self.parameters_index=null;
    };

    self.delete = function (id){
        if(confirm("删除是不可逆操作，确认删除？")){
            self.product.parameters.splice(self.eidtparameter,1);
            self.showEdit=false;
        }
    };

    self.save = function (){
		console.log(self.product);
		dealProduct();
    	Product.update({id:_product},self.product,function (data){
            if(data.code){
            	self.product.functions=copyFunctions;
            	self.product.parameters=copyParameters;
                return alert(data.msg);
            }
    		$state.go('admin-product-view');
    	},function (){
    		
    	});
    };

    init();
    
}]);


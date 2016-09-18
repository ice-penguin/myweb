'use strict';

angular.module('mywebApp')
  .controller('AdminViewProductController', ['$scope', '$location', '$state','$stateParams','$cookieStore','Product','Category',
    function ($scope, $location, $state,$stateParams,$cookieStore,Product,Category) {
    var self = this;
    var page = $stateParams.page || 1;
    var itemsPerPage = $stateParams.itemsPerPage || 50;  
    var _category = $stateParams._category; 

    self.pagination = {
      page: page,
      itemsPerPage: itemsPerPage,
      maxSize: 5,
      numPages: null,
      totalItems: null
    };

    var doLocation=function(){
        $location
        .search('page', self.pagination.page)
        .search('itemsPerPage', self.pagination.itemsPerPage)
        .search('_category', _category);
    };

    var loadCategory=function(){
        Category.index({isAll:'true',random:new Date().getTime()},function (data){
            self.categories=data.categories;
            self.categories.unshift({name:"全部"});
            initMenuStatus();
        },function(){

        });
    };

    var initMenuStatus=function(){
      _.each(self.categories,function (category){
        delete category.style;
      });
      var c=_.findWhere(self.categories,{_id:_category});

      if(c){
        c.style="unique_color";
      }else{
      	self.categories[0].style="unique_color";
      }
    };

    var loadProduct = function(){
    	var condition={
    		page:self.pagination.page,
    		itemsPerPage:self.pagination.itemsPerPage
    	};
    	if(_category){
    		condition._category=_category;
    	}
    	Product.index(condition,function (data){
    		self.products=data.products;
    	},function(){

    	});
    };
   	
   	var init = function(){
   		loadCategory();
   		loadProduct();
   	};

   	self.changCategory = function (id){
   		_category=id;
   		self.pagination.page=1;
   		doLocation();
   	};

   	init();
}]);


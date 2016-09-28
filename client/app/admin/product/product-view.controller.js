'use strict';

angular.module('mywebApp')
  .controller('AdminViewProductController', ['$scope', '$location', '$state','$stateParams','$cookieStore','Product','Category',
    function ($scope, $location, $state,$stateParams,$cookieStore,Product,Category) {
    var self = this;
    var page = $stateParams.page || 1;
    var itemsPerPage = $stateParams.itemsPerPage || 29;  
    var _category = $stateParams._category; 
    var sortBy= $stateParams.sortBy || "dateDes";

    self.sortBy=[{
      name:"时间降序",
      value:"dateDes"
    },{
      name:"时间升序",
      value:"dateAsce"
    },{
      name:"热值降序",
      value:"hotDes"
    },{
      name:"热值升序",
      value:"hotAsce"
    }];

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
        .search('_category', _category)
        .search('sortBy', sortBy);
    };

    var loadCategory=function(){
        Category.index({isAll:'true'},function (data){
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
        _category=null;
      	self.categories[0].style="unique_color";
      }
    };

    var initSort = function(){
      _.each(self.sortBy,function (sort){
        delete sort.style;
      });
      var c=_.findWhere(self.sortBy,{value:sortBy});

      if(c){
        c.style="unique_color";
      }else{
        sortBy="dateDes";
        self.sortBy[0].style="unique_color";
      }
    };

    var loadProduct = function(){
    	var condition={
    		page:self.pagination.page,
    		itemsPerPage:self.pagination.itemsPerPage,
        sortBy:sortBy
    	};
    	if(_category){
    		condition._category=_category;
    	}

    	Product.index(condition,function (data){
    		self.products=data.products;
        var totalItems = data.count;
        self.pagination.totalItems = totalItems;
        self.pagination.numPages = totalItems / itemsPerPage;
        self.pagination.page = data.page;
    	},function(){

    	});
    };
   	
   	var init = function(){
   		loadCategory();
   		loadProduct();
      initSort();
   	};

   	self.changCategory = function (id){
   		_category=id;
   		self.pagination.page=1;
   		doLocation();
   	};

    self.changSortBy = function (sort){
      sortBy=sort;
      self.pagination.page=1;
      doLocation();
    };

    self.pageChanged=function(){
        doLocation();
    };

   	init();
}]);


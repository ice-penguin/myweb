'use strict';

angular.module('mywebApp')
  .controller('ProductCtrl', ['$scope', '$location', '$state','$stateParams','$cookieStore','Product','Category',
    function ($scope, $location, $state,$stateParams,$cookieStore,Product,Category) {
    var self=this;
    var page = $stateParams.page || 1;
    var itemsPerPage = $stateParams.itemsPerPage || 18;  
    var _category = $stateParams._category; 
    var keyWord = $stateParams.keyWord; 

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
        .search('keyWord', keyWord);
    };

    var loadCategory=function(){
        Category.index({isAll:'true'},function (data){
            self.categories=data.categories;
            self.categories.unshift({name:"全部"});
        },function(){

        });
    };

    var loadProduct = function(){
        var condition={
            page:self.pagination.page,
            itemsPerPage:self.pagination.itemsPerPage
        };
        if(_category){
            condition._category=_category;
        }
        if(keyWord){
            condition.keyWord = keyWord;
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
    };

    self.changeCategory = function (id){
        if(id){
            _category=id;
        }else{
            _category=null;
        }
        self.pagination.page=1;
        keyWord=null;
        doLocation();
    };

    self.pageChanged=function(){
        doLocation();
    };

    init();
  }]);

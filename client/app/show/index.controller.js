'use strict';

angular.module('mywebApp')
  .controller('IndexCtrl', ['$scope', '$location', '$state','$stateParams','$cookieStore','Product','Category',
    function ($scope, $location, $state,$stateParams,$cookieStore,Product,Category) {

    var self = this;

    var loadCategory=function(){
        Category.index({isAll:'true'},function (data){
            self.categories=data.categories;
            self.categories.unshift({name:"全部"});
        },function(){

        });
    };

    var loadProduct = function(query,cb){

        Product.index(query,function (data){
            cb(null,data.products);
        },function(err){
            cb(err,null);
        });
    };

    var loadNewProduct = function(){
        var query={
            itemsPerPage:20
        };
        loadProduct(query,function (err,products){
            self.newProducts = products;
        });
    };

    var loadPushProduct = function(){
        var query={
            sortBy:"hotDes",
            itemsPerPage:9
        };
        loadProduct(query,function (err,products){
            self.pushProducts = products;
        });
    };

    var init = function(){
        loadCategory();
        loadPushProduct();
        loadNewProduct();
    };

    init();
  }]);

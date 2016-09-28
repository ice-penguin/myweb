'use strict';

angular.module('mywebApp')
  .controller('ProductShowCtrl', ['$scope', '$location', '$state','$stateParams','$cookieStore','Product','Category',
    function ($scope, $location, $state,$stateParams,$cookieStore,Product,Category) {
    var self = this;
    var id = $stateParams.id;

    var loadCategory=function(){
        Category.index({isAll:'true'},function (data){
            self.categories=data.categories;
            self.categories.unshift({name:"全部"});
        },function(){

        });
    };

    var loadProduct = function(){
        Product.index({id:id},function (data){
            self.product = data.product;
        });
    };

    var init = function(){
        loadCategory();
        loadProduct();
    };

    init();
  }]);

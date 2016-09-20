'use strict';

angular.module('mywebApp')
  .controller('ConnectCtrl',  ['$scope', '$location', '$state','$stateParams','$cookieStore','Category',
    function ($scope, $location, $state,$stateParams,$cookieStore,Category) {
    var self = this;

    var loadCategory=function(){
        Category.index({isAll:'true',random:new Date().getTime()},function (data){
            self.categories=data.categories;
            self.categories.unshift({name:"全部"});
        },function(){

        });
    };

    var init = function(){
        loadCategory();
    };

    init();
  }]);

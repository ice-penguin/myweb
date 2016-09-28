'use strict';

angular.module('mywebApp')
  .controller('AboutUsCtrl', ['$scope', '$location', '$state','$stateParams','$cookieStore','Category',
    function ($scope, $location, $state,$stateParams,$cookieStore,Category) {

    var self = this;

    var loadCategory=function(){
        Category.index({isAll:'true'},function (data){
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

'use strict';

angular.module('mywebApp')
  .controller('NavbarAdminController', ['$scope', '$location', '$state','$stateParams','Auth',
   function ($scope, $location, $state,$stateParams,Auth) {
    var self = this;

    var isLoggedIn=function (){
        var token=Auth.getToken();
        if(!token){
          $state.go('index');
        }
    };
    
  	var menu = function (){
	  	self.menu = [{
  		    title:'分类',
  		    state:'admin-category-view'
  		},{
          title:'产品',
          state:'admin-product-view'
      }];
      initMenuStatus();
  	};

    var initMenuStatus=function(){
      _.each(self.menu,function (menu){
        delete menu.style;
        _.each(menu.content,function (content){
          delete content.style;
        });
      });
      var navValue = $stateParams.navValue;
      var c=_.findWhere(self.menu,{state:navValue});

      if(c){
        c.style="unique_color";
        if(c.content){
          c.content[0].style="navOrange";
        }
        return ;
      }

      _.each(self.menu,function (menu){
        
        var c=_.findWhere(menu.content,{state:navValue});
        if(c){
          c.style="navOrange";
          menu.style="unique_color";
          return false;
        }
      });
    };
        
    var init = function (){
        isLoggedIn();
        menu();
    };

    self.logout = function (){
      Auth.logout();
      $state.go('index');
    };

    init();
  }]);

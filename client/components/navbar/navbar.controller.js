'use strict';

angular.module('mywebApp')
  .controller('NavbarCtrl', ['$scope', '$location', '$state','$stateParams','Auth',
    function ($scope, $location,$state,$stateParams, Auth) {
    var self=this;

    var menu = function (){
        self.menu = [{
            title:'锦跃首页',
            state:'index'
        },{
          title:'关于我们',
          state:'about-us'
        },{
          title:'产品中心',
          state:'product'
        },{
          title:'联系我们',
          state:'connect'
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
        c.style="cur";
        if(c.content){
          c.content[0].style="navOrange";
        }
        return ;
      }

      _.each(self.menu,function (menu){
        
        var c=_.findWhere(menu.content,{state:navValue});
        if(c){
          c.style="navOrange";
          menu.style="cur";
          return false;
        }
      });
    };
        
    var init = function (){
        menu();
    };

    init();
    console.log(self.menu);
  }]);
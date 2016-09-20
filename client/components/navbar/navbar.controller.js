'use strict';

angular.module('mywebApp')
  .controller('NavbarCtrl', ['$scope', '$location', '$state','$stateParams','Auth','Category',
    function ($scope, $location,$state,$stateParams, Auth,Category) {
    var self=this;

    var _category=null;

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

    var loadCategory=function(){
        Category.index({isAll:'true',random:new Date().getTime()},function (data){
            self.categories=data.categories;
            self.categories.unshift({name:"产品分类"});
        },function(){

        });
    };
        
    var init = function (){
        menu();
        loadCategory();
    };

    self.changeCategory = function (category){
      _category=null;
      if(category._id){
        _category=category._id;
      }
    };

    self.search =function(){
      var parmas={
        page:1
      };
      var count=0;
      if(_category){
        count++;
        parmas._category=_category;
      }else{
        parmas._category=null;
      }
      if(self.keyWord){
        count++;
        parmas.keyWord=self.keyWord;
      }else{
        parmas.keyWord=null;
      }
      if(!count){
        return;
      }
      $state.go("product",parmas);
    };

    init();
  }]);
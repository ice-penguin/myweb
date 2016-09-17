'use strict';

angular.module('mywebApp')
  .controller('NavbarAdminController', ['$scope', '$location', '$state','$stateParams','Auth',
   function ($scope, $location, $state,$stateParams,Auth) {
    var self = this;

    var isLoggedIn=function (){
        var token=Auth.getToken();
        if(!token){
          $state.go('patient-treatment-first');
        }
    };
    
  	var menu = function (){
	  	self.menu = [{
  		    title:'医院',
  		    state:'admin-clinic-view'
  		},{
  		    title:'类目',
  		    state:'admin-treatment-first',
          content:[{
              title:"整形项目",
              state:'admin-treatment-first'
          },{
              title:"地区",
              state:'admin-city-view',
          },{
              title:"资质",
              state:'admin-accreditation-view',
          },{
              title:"大图",
              state:'admin-banner-view',
          }]
  		},{
  		    title:'用户',
  		    state:'admin-customer-view',
          content:[{
              title:"账号",
              state:'admin-customer-view'
          },{
              title:"建议",
              state:'admin-advice-view'
          }]
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

    init();
  }]);

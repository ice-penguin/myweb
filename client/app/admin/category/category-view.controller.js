'use strict';

angular.module('mywebApp')
.controller('ViewCategoryCtrl', ['$scope', '$location', '$state','$stateParams','$cookieStore','Auth','User','Category',
function ($scope, $location, $state,$stateParams,$cookieStore,Auth,User,Category) {
	var self=this;
    var page = $stateParams.page || 1;
    var itemsPerPage = $stateParams.itemsPerPage || 50;  
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
        .search('itemsPerPage', self.pagination.itemsPerPage);
    };

    var initEnvironment = function(hasNav,token){
        var system ={};  
        var browser_width = $(document.body).width()*0.782;
        if(browser_width>1000){
            browser_width=1000;
        }
        var i=parseInt(browser_width/100);
        $("div.box").css("width",i*100);
        $(window).resize(function() {
            var browser_width = $("div.tableList").width();
            // console.log(browser_width);
            var i=parseInt(browser_width/100);
            $("div.box").css("width",i*100);
        }); 
        init();
    };

    var init=function(){
        self.showEdit=false;
        loadCategory();
    };

    var loadCategory=function(){
        Category.index({itemsPerPage:self.pagination.itemsPerPage,page:self.pagination.page,random:new Date().getTime()},function (data){
            self.categories=data.categories;
            var totalItems = data.count;
            self.pagination.totalItems = totalItems;
            self.pagination.numPages = totalItems / itemsPerPage;
            self.pagination.page = data.page;
        },function(){

        });
    };

    initEnvironment();

    //显示编辑框
    self.showEidtCell=function (table){
        self.showEdit=true;
        if(table){
            self.eidtTable=_.clone(table);
        }else{
            self.eidtTable={};
        }
    };
    //关闭编辑框
    self.closeEditCell=function(){
        delete self.eidtTable;
        self.showEdit=false;
    };
    //保存修改结果，新增或者update
    self.save=function(){
        if(self.eidtTable._id){
            Category.update({id:self.eidtTable._id},self.eidtTable,function (data){
                if(data.code){
                    return alert(data.msg);
                }
                self.closeEditCell();
                init();

            },function(){});
        }else{
            // console.log(self.eidtTable);
            Category.create({},self.eidtTable,function (data){
                if(data.code){
                    return alert(data.msg);
                }
                self.closeEditCell();
                init();
            },function(){});
        }
    };

    self.delete = function (id){
        if(confirm("删除是不可逆操作，确认删除？")){
            Category.destory({id:id},{},function (){
                init();
            },function (){

            });
        }
    };

    self.pageChanged = function(){
        doLocation();
        loadCategory();
    };
}]);

'use strict';

angular.module('mywebApp')
  .config(function ($stateProvider) {
  	$stateProvider
    //医生
    .state('admin-product-view', {
      params:{"navValue":"admin-product-view"},
      url: '/admin/product/view?page&itemsPerPage',
      templateUrl: 'app/admin/product/product-view.html',
      controller: 'AdminViewProductController',
      controllerAs: 'viewProductCtrl',
      // authenticate: 'admin'
    })
    .state('admin-product-add', {
      params:{"navValue":"admin-product-view"},
      url: '/admin/product/add',
      templateUrl: 'app/admin/product/product-add.html',
      controller: 'AdminAddProductController',
      controllerAs: 'addProductCtrl',
      // authenticate: 'admin'
    })
    .state('admin-product-edit', {
      params:{"navValue":"admin-product-view"},
      url: '/admin/product/edit/:_product',
      templateUrl: 'app/admin/product/product-edit.html',
      controller: 'AdminEditProductController',
      controllerAs: 'editProductCtrl',
      // authenticate: 'admin'
    });
  });
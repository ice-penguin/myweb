'use strict';

angular.module('mywebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'app/show/index.htm',
        controller: 'IndexCtrl',
        controllerAs:'indexCtrl'
      })
      .state('product', {
        url: '/product',
        templateUrl: 'app/show/product.htm',
        controller: 'ProductCtrl',
        controllerAs:'productCtrl'
      })
      .state('connect', {
        url: '/connect',
        templateUrl: 'app/show/connect.htm',
        controller: 'ConnectCtrl',
        controllerAs:'connectCtrl'
      })
      .state('about-us', {
        url: '/about-us',
        templateUrl: 'app/show/about_us.htm',
        controller: 'AboutUsCtrl',
        controllerAs:'aboutUsCtrl'
      });
  });
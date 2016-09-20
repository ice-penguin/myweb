'use strict';

angular.module('mywebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        params:{"navValue":"index"},
        templateUrl: 'app/show/index.html',
        controller: 'IndexCtrl',
        controllerAs:'indexCtrl'
      })
      .state('product', {
        url: '/product?page&itemsPerPage&_category&keyWord',
        params:{"navValue":"product"},
        templateUrl: 'app/show/product.html',
        controller: 'ProductCtrl',
        controllerAs:'productCtrl'
      })
      .state('product-show', {
        url: '/product/:id',
        params:{"navValue":"product"},
        templateUrl: 'app/show/product-show.html',
        controller: 'ProductShowCtrl',
        controllerAs:'productShowCtrl'
      })
      .state('connect', {
        url: '/connect',
        params:{"navValue":"connect"},
        templateUrl: 'app/show/connect.html',
        controller: 'ConnectCtrl',
        controllerAs:'connectCtrl'
      })
      .state('about-us', {
        url: '/about-us',
        params:{"navValue":"about-us"},
        templateUrl: 'app/show/about_us.html',
        controller: 'AboutUsCtrl',
        controllerAs:'aboutUsCtrl'
      });
  });
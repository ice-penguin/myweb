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
      .state('news', {
        url: '/news?page&itemsPerPage&_category&keyWord',
        params:{"navValue":"news"},
        templateUrl: 'app/show/news.html',
        controller: 'NewsCtrl',
        controllerAs:'newsCtrl'
      })
      // .state('news-show', {
      //   url: '/news/:id',
      //   params:{"navValue":"news"},
      //   templateUrl: 'app/show/news-show.html',
      //   controller: 'NewsShowCtrl',
      //   controllerAs:'newsShowCtrl'
      // })
      .state('sample', {
        url: '/sample?page&itemsPerPage&_category&keyWord',
        params:{"navValue":"sample"},
        templateUrl: 'app/show/sample.html',
        controller: 'SampleCtrl',
        controllerAs:'sampleCtrl'
      })
      // .state('sample-show', {
      //   url: '/sample/:id',
      //   params:{"navValue":"sample"},
      //   templateUrl: 'app/show/sample-show.html',
      //   controller: 'SampleShowCtrl',
      //   controllerAs:'sampleShowCtrl'
      // })
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
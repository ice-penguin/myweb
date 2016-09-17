'use strict';

angular.module('mywebApp')
  .config(function ($stateProvider) {
  	$stateProvider
    //医生
    .state('admin-doctor-view', {
      params:{"navValue":"admin-clinic-view"},
      url: '/admin/doctor/view?page&itemsPerPage',
      templateUrl: 'app/admin/doctor/doctor-view.html',
      controller: 'AdminViewDoctorController',
      controllerAs: 'viewDoctorCtrl',
      // authenticate: 'admin'
    })
    .state('admin-doctor-add', {
      params:{"navValue":"admin-clinic-view"},
      url: '/admin/doctor/add',
      templateUrl: 'app/admin/doctor/doctor-add.html',
      controller: 'AdminAddDoctorController',
      controllerAs: 'addDoctorCtrl',
      // authenticate: 'admin'
    })
    .state('admin-doctor-edit', {
      params:{"navValue":"admin-clinic-view"},
      url: '/admin/doctor/edit/:_doctor',
      templateUrl: 'app/admin/doctor/doctor-edit.html',
      controller: 'AdminEditDoctorController',
      controllerAs: 'editDoctorCtrl',
      // authenticate: 'admin'
    });
  });
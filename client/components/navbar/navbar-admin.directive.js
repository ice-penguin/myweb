'use strict';

angular.module('mywebApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar-admin.html',
    restrict: 'E',
    controller: 'NavbarAdminController',
    controllerAs: 'nav'
  }));

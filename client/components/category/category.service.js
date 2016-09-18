'use strict';

angular.module('mywebApp')
  .factory('Category', function ($resource) {
    return $resource('/api/categories/:id/:controller', {
      id: '@_id'
    },
    {
      index:{
        method:'GET'
      },
      create:{
        method:'POST'
      },
      update:{
        method:'PUT'
      },
      destory:{
        method:'DELETE'
      }
	  });
  });

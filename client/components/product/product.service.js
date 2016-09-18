'use strict';

angular.module('mywebApp')
  .factory('Product', function ($resource) {
    return $resource('/api/products/:id/:controller', {
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

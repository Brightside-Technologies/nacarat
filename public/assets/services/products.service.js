(function() {
    'use strict';

    angular
        .module('Nacarat.Services')
        .service('ProductsService', ProductsService);

    ProductsService.$inject = [
        '$resource',
        '$http',
        'config'
    ];

    function ProductsService($resource, $http, config) {
        // var url = baseUrl + '/products/:productId'
        var baseUrl = config.baseUrl;

        var service = this;

        service.query = function(){
          var url = baseUrl + '/products'
          return $http({
            url: url,
            method: 'GET'
          });
        }

        service.get = function(productId){
          // var url = baseUrl + '/products/:productId'
          var url = baseUrl + '/products'
          return $http({
            url: url,
            method: 'GET'
          });
        }

    }
})();

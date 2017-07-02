(function() {
    'use strict';

    angular
        .module('Nacarat.Services')
        .factory('ProductsService', ProductsService);

    ProductsService.$inject = [
        '$resource',
        '$http'
    ];

    function ProductsService($resource, $http) {
        //TODO: Define url in app.constant()

        // var baseUrl = "https://radwdeqv2h.execute-api.us-east-1.amazonaws.com/dev";
        // var url = baseUrl + '/products/:productId'
        var baseUrl = "http://127.0.0.1:3000";
        var url = baseUrl + '/products/:productId'

        // $resource(url + '/products/:productId')
        var ProductsResource = $resource(url,
          {
            productId: '@productId'
          },
          {
              query: {
                  isArray: false
              },
              get: {
                transfromResponse: function(response){
                  console.log("Get response",response);

                }
              }
          });

        return ProductsResource;
    }
})();

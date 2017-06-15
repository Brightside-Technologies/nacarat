(function() {
    'use strict';

    angular
        .module('Nacarat.Services')
        .factory('ProductsService', ProductsService);

    ProductsService.$inject = [
        '$resource'
        '$http'
    ];

    function ProductsService($resource, $http) {
      var url = "localhost:3000";

      // var service = this;
      // service.query = function(){
      //   return $http({
      //     method: 'GET',
      //     url:url + '/products'
      //   })
      // }

        //TODO: Define url in app.constant()
        var url = "localhost:3000";
        var ProductsResource = $resource(url + '/products/:productId', {
            productId: '@productId'
        }, {
            query: {
                //isArray: true
            }
        });

        return ProductsResource;
    }
})();

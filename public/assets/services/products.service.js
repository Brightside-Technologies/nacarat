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
        var url = "https://radwdeqv2h.execute-api.us-east-1.amazonaws.com/dev";
        var ProductsResource = $resource(url + '/products/:productId', {
            productId: '@productId'
        }, {
            query: {
                isArray: false
            }
        });

        return ProductsResource;
    }
})();

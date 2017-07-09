(function() {
    'use strict';

    angular
        .module('Nacarat.Services')
        .service('VendorService', VendorService);

    VendorService.$inject = [
        '$resource',
        '$http',
        'config'
    ];

    function VendorService($resource, $http, config) {
      // var url = baseUrl + '/products/:vendorId'
      var baseUrl = config.baseUrl;

      var service = this;

      service.query = function(){
        var url = baseUrl + '/vendors'
        return $http({
          url: url,
          method: 'GET'
        });
      }

      service.get = function(vendorId){
        // var url = baseUrl + '/products/:vendorId'
        var url = baseUrl + '/vendors'
        return $http({
          url: url,
          method: 'GET'
        });
      }
    }
})();

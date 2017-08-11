(function() {
    'use strict';

    angular
        .module('Public.Vendor')
        .controller('VendorListController', VendorListController);
        VendorListController.$inject = [
            '$state',
            '$scope',
            'VendorService'
        ];
    function VendorListController($state, $scope, VendorService) {
      var vm = this;
      vm.vendors = [];

      init();

      function init() {
        $scope.getOneTrans = function(vendorId) {
            $state.go('main.vendor', {vendorId: vendorId});
        };
        VendorService.query()
        .then(function success(response) {
            console.log('response', response);
            vm.vendors = response.data.data;
        },
        function error(e) {
            console.error(e);
        });
      }
  }
})();

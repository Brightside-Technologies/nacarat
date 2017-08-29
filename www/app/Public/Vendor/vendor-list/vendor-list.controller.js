VendorListController.$inject = [
  '$state',
  '$scope',
  'VendorService'
];

export default function VendorListController($state, $scope, VendorService) {
  var vm = this;
  vm.vendors = [];

  init();

  function init() {
    $scope.getOneTrans = function(vendorId) {
      $state.go('main.vendor', {
        vendorId: vendorId
      });
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

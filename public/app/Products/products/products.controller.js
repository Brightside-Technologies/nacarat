(function() {
    'use strict';

    angular
        .module('Products')
        .controller('ProductsController', ProductsController);
        ProductsController.$inject = [
            '$state',
            '$scope',
            'ProductsService'
        ];
    function ProductsController($state, $scope, ProductsService) {
        var vm = this;
        vm.products = [];

        init();

        function init() {
          $scope.getOneTrans = function(productId) {
              $state.go('main.product', {productId: productId});
          };
          ProductsService.query()
          .then(function success(response) {
              console.log('response', response);
              vm.products = response.data.data;
          },
          function error(e) {
              console.error(e);
          });
        }
    }
})();

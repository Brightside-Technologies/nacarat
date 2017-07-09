(function() {
    'use strict';

    angular
        .module('Products')
        .controller('ProductsController', ProductsController);
        ProductsController.$inject = [
            '$state',
            'DailyDealsService',
            'ProductsService'
        ];
    function ProductsController($state, DailyDealsService, ProductsService) {
        var vm = this;
        vm.dailyDeals = [];

        init();

        function init() {

          ProductsService.query({},
          function success(response) {
              console.log('response', response);
              vm.dailyDeals = response.data;
              console.log('vm.dailyDeals', vm.dailyDeals);
          },
          function error(e) {
              console.error(e);
          });
        }
    }
})();

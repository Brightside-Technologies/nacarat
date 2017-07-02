(function() {
    'use strict';

    angular
        .module('Home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
        '$state',
        'DailyDealsService',
        'ProductsService'
    ];

    function HomeController($state, DailyDealsService, ProductsService) {
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
          })
            // DailyDealsService.query({},
            //     function success(response) {
            //         vm.dailyDeals = response;
            //     },
            //     function error(e) {
            //         console.error(e);
            //     })
        }
    }
})();

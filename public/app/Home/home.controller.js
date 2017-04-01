(function() {
    'use strict';

    angular
        .module('Home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
        '$state',
        'DailyDealsService'
    ];

    function HomeController($state, DailyDealsService) {
        var vm = this;
        vm.dailyDeals = [];

        init();

        function init() {
            DailyDealsService.query({},
                function success(response) {
                    vm.dailyDeals = response;
                },
                function error(e) {
                    console.error(e);
                })
        }
    }
})();

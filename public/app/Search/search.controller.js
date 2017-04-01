(function() {
    'use strict';

    angular
        .module('Search')
        .controller('SearchController', SearchController);

    function SearchController() {
        var vm = this;
        vm.title = "Search";

        init();

        function init() {

        }
    }
})();

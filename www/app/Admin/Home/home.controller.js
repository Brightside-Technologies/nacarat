(function() {
    'use strict';

    angular
        .module('Admin.Home', [])
        .controller('AdminHomeController', AdminHomeController);

    //AdminHomeController.$inject = ['dependencies'];

    function AdminHomeController() {
        var vm = this;
        vm.title = "Admin Home";

        init();

        function init() {

        }
    }
})();

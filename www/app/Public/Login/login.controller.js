(function() {
    'use strict';

    angular
        .module('Login', [])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state'];

    function LoginController($state) {
        var vm = this;
        vm.login = login;

        init();

        function init() {

        }

        function login(){
          $state.go('admin.root.home');
        }
    }
})();

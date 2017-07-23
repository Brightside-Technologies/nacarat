(function() {
  'use strict';

  angular
    .module('Layouts')
    .controller('AdminLayoutController', AdminLayoutController);

  AdminLayoutController.$inject = ['$mdSidenav'];

  function AdminLayoutController($mdSidenav) {
    var vm = this;
    vm.toggleSidenav = function() {
      $mdSidenav('admin-sidenav').toggle();
    }
  }
})();

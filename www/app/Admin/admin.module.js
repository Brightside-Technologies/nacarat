(function() {
    'use strict';

    angular
        .module('Admin', [
          'Admin.Home',
          'Admin.Delivery',
          'Admin.Inventory',
          'Admin.Profile',
          'Admin.Settings'
        ]);
})();

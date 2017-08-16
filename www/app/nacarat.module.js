(function() {
  'use strict';

  angular
    .module('Nacarat', [
      'ui.router',
      'ngResource',
      'ngSanitize',
      'ngMaterial',
      'bc.Flickity',
      'md.data.table',
      'Nacarat.Admin',
      'Nacarat.Public',
      'Nacarat.Helpers',
      'Nacarat.Services',
      'Nacarat.Directives'
    ])
    .constant('config', {
      "baseUrl": "https://my-json-server.typicode.com/go-diego/datastore"
    })
    .config(function($mdThemingProvider) {

      // #2d2d2d
      // #212121

      var nacarat = $mdThemingProvider.extendPalette('orange', {
        //'500': '#f08875',
        '400': '#EF5350',
        '500': '#FF5252',
        '800': '#C62828',
        '900': '#B71C1C',
        'contrastDefaultColor': 'light'
      });

      // var nacarat = $mdThemingProvider.definePalette('nacarat', {
      //     //'500': '#f08875',
      //     '400': '#EF5350',
      //     '500': '#FF5252',
      //     '800': '#C62828',
      //     '900': '#B71C1C',
      //     'contrastDefaultColor': 'light'
      // });

      $mdThemingProvider.definePalette('nacarat', nacarat);

      $mdThemingProvider
        .theme('default')
        .primaryPalette('nacarat')
        .accentPalette('blue')
        .warnPalette('red')
        .backgroundPalette('grey');
    })
    .run(function($rootScope, $state, $stateParams, $mdSidenav, $mdComponentRegistry) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams, options) {
          var sidenav = $mdComponentRegistry.get('admin-sidenav');
          if (sidenav && $mdSidenav('admin-sidenav').isOpen()) {
            $mdSidenav('admin-sidenav').close();
          }
        });

    });

})();

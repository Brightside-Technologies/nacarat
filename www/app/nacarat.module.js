// dependencies
import 'angular-material/layouts/angular-material.layouts.css';
import 'angular-material/angular-material.css';
import '../assets/styles/site.css';
import angular from 'angular';
import ngMaterial from 'angular-material';
import uirouter from 'angular-ui-router';

import run from './nacarat.config';
import routes from './nacarat.routes';
import Nacarat_Admin from './Admin/admin.module';
import Nacarat_Public from './Public/public.module';

//import Kontaktio from './kontaktio/kontaktio.module';
//import SmartyStreets from './smarty-streets/smarty-streets.module';
//import Services from '../assets/services/services.module';

angular
  .module('Nacarat', [
    uirouter,
    //'ngResource',
    //'ngSanitize',
    ngMaterial,
    //'bc.Flickity',
    //'md.data.table',
    //'Nacarat_Admin',
    'Nacarat_Public'
    //'Nacarat.Helpers',
    //'Nacarat.Services',
    //'Nacarat.Directives'
  ])
  .constant('config', {
    "baseUrl": "http://127.0.0.1:3000"
  })
  .config(routes)
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

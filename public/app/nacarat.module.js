(function() {
    'use strict';

    angular
        .module('Nacarat', [
            'ngMaterial',
            'ui.router',
            'ngResource',
            'Home',
            'Products',
            'Subscribe',
            'FAQ',
            'About',
            'Nacarat.Services'
        ])
        .config(function($mdThemingProvider) {

            var nacarat = $mdThemingProvider.extendPalette('orange', {
                //'500': '#f08875',
                '400': '#EF5350',
                '500': '#FF5252',
                '800': '#C62828',
                '900': '#B71C1C',
                'contrastDefaultColor': 'light'
            })

            $mdThemingProvider.definePalette('nacarat', nacarat);

            $mdThemingProvider
                .theme('default')
                .primaryPalette('nacarat')
                .accentPalette('blue')
                .warnPalette('red')
                .backgroundPalette('grey');
        })
        .run(function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        });

})();

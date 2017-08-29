export default function NacaratTheme($mdThemingProvider){

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
}

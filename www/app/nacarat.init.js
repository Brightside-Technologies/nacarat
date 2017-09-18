export default function NacaratInit($rootScope, $state, $stateParams, $mdSidenav){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  // $rootScope.$on('$stateChangeSuccess',
  //   function(event, toState, toParams, fromState, fromParams, options) {
  //
  //   });
}

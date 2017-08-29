export default function Run($rootScope, $state, $stateParams, $mdSidenav, $mdComponentRegistry){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams, options) {
      var sidenav = $mdComponentRegistry.get('admin-sidenav');
      if (sidenav && $mdSidenav('admin-sidenav').isOpen()) {
        $mdSidenav('admin-sidenav').close();
      }
    });
}

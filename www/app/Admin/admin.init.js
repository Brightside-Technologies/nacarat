export default function AdminInit($rootScope, $state, $stateParams, $mdSidenav, $mdComponentRegistry, AuthenticationService) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  var nacaratVendorUser = {};
  var isNacaratVendroUserLoggedIn = false;

  // TODO: check if user is authorized on statechangestart
  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams, options) {
      var sidenav = $mdComponentRegistry.get('admin-sidenav');
      if (sidenav && $mdSidenav('admin-sidenav').isOpen()) {
        $mdSidenav('admin-sidenav').close();
      }
    });

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options) {
      nacaratVendorUser = AuthenticationService.isLoggedUserIn();
      isNacaratVendroUserLoggedIn = !(_.isEmpty(nacaratVendorUser) || _.isNull(nacaratVendorUser));
      console.log('nacaratVendorUser', nacaratVendorUser);
      if (!isNacaratVendroUserLoggedIn && toState.name != 'login.root') {
        $state.go('login.root');
      }
    });

  // TODO: AngularJS throws an 'unhandled rejection' error. Fix this
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("login.root");
    }
  });
}

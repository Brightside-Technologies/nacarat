export default function AdminInit($rootScope, $state, $stateParams, $mdSidenav, $mdComponentRegistry, AuthenticationService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams, options) {
            var sidenav = $mdComponentRegistry.get('admin-sidenav');
            if (sidenav && $mdSidenav('admin-sidenav').isOpen()) {
                $mdSidenav('admin-sidenav').close();
            }
        });


    // TODO: AngularJS throws an 'unhandled rejection' error. Fix this
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        console.log('$stateChangeError');
        if (error === "AUTH_REQUIRED") {
            $state.go("login.root");
        }
    });

    // TODO: use inherited state data to determnine if state 'isPublic'
    AuthenticationService.onAuthStateChanged(function(authData) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                var isUserAuthenticated = !_.isEmpty(AuthenticationService.getAuthenticatedUser());
                var isToStateLogin = toState.name == "login.root";
                var isToStatePublic = toState.name.includes('public') || toState.name.includes('login');

                if (!isUserAuthenticated && !isToStateLogin && !isToStatePublic) {
                    $state.go('login.root');
                }
            });

        if (!authData && $state.current.name.includes('admin')) {
            $state.go('login.root');
        }
    })
}
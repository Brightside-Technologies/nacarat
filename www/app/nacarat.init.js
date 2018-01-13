export default function NacaratInit($rootScope, $state, $stateParams, $mdSidenav, $requestErrorHandler) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // TODO: AngularJS throws an 'unhandled rejection' error. Fix this
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        console.log("$stateChangeError");
        if (error === "AUTH_REQUIRED") {
            $state.go("login.root");
        } else {
            $state.go("error.root");
        }
    });

    $rootScope.$on("$stateNotFound", function(event, unfoundState, fromState, fromParams) {
        $state.go("not-found.root");
    });

    $rootScope.$on("responseError", function(event, response) {
        $requestErrorHandler(response);
    });
}

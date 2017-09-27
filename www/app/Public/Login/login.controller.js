// TODO: Implement user registriation (after app works with google and facebooj?)
// TODO: Firebase.js is referenced in index.html.  Can I import this?
// TODO: Add proper form validation messages
export default function LoginController($state, $mdToast, $rootScope, RequireNoAuth, AuthenticationService) {
    var vm = this;
    //vm.login = login;
    vm.loginWithProvider = loginWithProvider;

    init();

    function init() {}

    function loginWithProvider(provider) {
        AuthenticationService.signInWithPopup(provider)
            .then(function(loginResponse) {
                    // loginResponse.credential
                    $state.go('admin.root.home');
                },
                function error(err) {
                    console.log('err', err);
                    $mdToast.showSimple(err.message);
                });
    }
}
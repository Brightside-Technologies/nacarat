// TODO: Implement user registriation
// TODO: Firebase.js is referenced in index.html.  Can I import this?
// TODO: Add proper form validation messages
export default function LoginController($state, $mdToast, $rootScope, RequireNoAuth, AuthenticationService) {
    var vm = this;
    vm.loginWithProvider = loginWithProvider;
    vm.logInWithUsernamePassword = logInWithUsernamePassword;
    vm.credentials = {};
    vm.credentials.email = '';
    vm.credentials.password = '';

    init();

    function init() {}

    function loginWithProvider(provider) {
        AuthenticationService.signInWithPopup(provider)
            .then(function(loginResponse) {
                    $state.go('admin.root.home');
                },
                function error(err) {
                    console.log('err', err);
                    $mdToast.showSimple(err.message);
                });
    }

    function logInWithUsernamePassword(user) {
        AuthenticationService.logInWithUsernamePassword(user)
            .then(function(loginResponse) {
                    $state.go('admin.root.home');
                },
                function error(err) {
                    console.log('err', err);
                    $mdToast.showSimple(err.message);
                });
    }
}
// TODO: Implement logout
// TODO: Implement user registriation (after app works with google and facebooj?)
// TODO: Manage cookie. Check if user is logged in on state change. Else, kick them out of app
// TODO: Firebase.js is referenced in index.html.  Can I import this?
// TODO: Add proper form validation messages
export default function LoginController($state, $mdToast, AuthenticationService) {
  var vm = this;
  //vm.login = login;
  vm.loginWithProvider = loginWithProvider;

  init();

  function init() {}

  // function login() {
  //   $state.go('admin.root.home');
  // }

  function loginWithProvider(provider) {
    AuthenticationService.signInWithPopup(provider)
      .then(function(loginResponse) {
          console.log('loginResponse', loginResponse);
          // loginResponse.credential
          $state.go('admin.root.home');
        },
        function error(err) {
          console.log('err', err);
          $mdToast.showSimple(err.message);
        });
  }
}

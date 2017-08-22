export default function LoginController($state) {
  var vm = this;
  vm.login = login;

  init();

  function init() {

  }

  function login() {
    $state.go('admin.root.home');
  }
}

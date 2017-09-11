export default function FooterDirective() {
  return {
    restrict: 'E',
    template: require('./footer.directive.html'),
    controller: FooterController,
    controllerAs: 'vm',
    bindToController: true
  };

    function FooterController() {
      var vm = this;

      var date = new Date();
      vm.currentYear = date.getFullYear();
    }
}

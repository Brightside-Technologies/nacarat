export default function ProductsController($state, $stateParams, ProductsService) {
  var vm = this;
  vm.products = [];

  init();

  function init() {
    ProductsService
      .queryBySuggestion($stateParams.q)
      .then(function success(response) {
          console.log('response', response);
          vm.products = response.data;
        },
        function error(e) {
          console.error(e);
        });
  }
}

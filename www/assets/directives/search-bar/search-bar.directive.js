(function() {
  "use strict";
  angular.module('Nacarat.Directives')
    .directive('searchBar', SearchBarDirective);

  function SearchBarDirective() {
    return {
      restrict: 'E',
      templateUrl: 'www/assets/directives/search-bar/search-bar.directive.html',
      controller: SearchBarController,
      controllerAs: 'vm',
      bindToController: true
    };

    function SearchBarController($state, $http, $q, ProductsService) {
      var vm = this;
      var throttledSearchSuggestions = _.throttle(function(value) {
          return getSearchSuggestions(value) || [];
        },
        2000);

      vm.getSearchSuggestions = getSearchSuggestions;
      vm.throttledSearchSuggestions = throttledSearchSuggestions;
      vm.itemSelected = itemSelected;

      function getSearchSuggestions(value) {
        return ProductsService.search(value)
          .then(function(searchResponse) {
              return searchResponse;
            },
            function error(errorResponse) {
              console.log('errorResponse', errorResponse);
            })
      }

      function itemSelected(item) {
        console.log("ITEM SELECTED", item);
        if (item) {
          // TODO: save search text in cookie to keep after research
          // TODO: add resolve at 'public.root.products' ?!?.
          // it would make 'public.root.products' reusable
          $state.go('public.root.products', {q: item.text});
        }
      }

    }
  }
})();

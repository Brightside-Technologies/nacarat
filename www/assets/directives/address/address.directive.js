export default function AddressDirective() {
  return {
    restrict: "E",
    template: require("./address.directive.html"),
    controller: AddressController,
    scope: {
      model: "=",
      form: "="
    },
    controllerAs: "vm",
    bindToController: true
  };
}

function AddressController($scope, $http, $q, $addressHelper) {
  var vm = this;
  // var throttledAddressSuggestions = _.throttle(function(value) {
  //   return $addressHelper.getSuggestions(value) || [];
  // }, 2000);
  vm.getAddressSuggestions = getAddressSuggestions;
  //vm.throttledAddressSuggestions = throttledAddressSuggestions;
  vm.suggestedAddressSelected = suggestedAddressSelected;

  $scope.$watch("vm.model", function(newModel, oldModel) {
    vm.addressSearchText =
      vm.model.delivery_line_1 + ", " + vm.model.components.city_name + " " + vm.model.components.state_abbreviation;
  });

  function suggestedAddressSelected(address) {
    if (address) {
      var selectedAddress = address;
      var addressDTO = {};
      $addressHelper.getAddress(address).then(function(response) {
        if (response !== "INVALID_ADDRESS") {
          vm.model = $addressHelper.validResponseToDTO(response);
        } else {
          vm.model = $addressHelper.invalidResponseToDTO(selectedAddress);
        }
      });
    }
  }

  function getAddressSuggestions(value) {
    return $addressHelper.getSuggestions(value) || [];
  }
}

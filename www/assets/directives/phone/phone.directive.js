export default function PhoneDirective() {
    return {
        restrict: "E",
        template: require("./phone.directive.html"),
        controller: PhoneController,
        scope: {
            model: "=",
            form: "="
        },
        controllerAs: "vm",
        bindToController: true
    };
}

function PhoneController($scope, $phoneHelper, $errorHandler) {
    var number = "";
    var isOldSameAsNew = false;
    var rawPhone = "";
    var vm = this;
    $scope.$watch(
        "vm.model",
        function(newPhone, oldPhone) {
            isOldSameAsNew = _.isEqual(oldPhone, newPhone);
            if (newPhone.nationalFormat) {
                rawPhone = newPhone.nationalFormat
                    .replace("-", "")
                    .replace("(", "")
                    .replace(")", "")
                    .replace(" ", "");
                if (rawPhone.length == 10 && !isOldSameAsNew) {
                    $phoneHelper
                        .validate(1 + rawPhone)
                        .then(function(response) {
                            vm.model = response.data.data;
                        })
                        // TODO: add form validation. Error message
                        .catch($errorHandler);
                }
            }
        },
        true
    );
}

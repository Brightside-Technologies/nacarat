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

function PhoneController($scope, $http, $q, $phoneHelper) {
    var vm = this;
    console.log("vm", vm);
    var number = "";

    $scope.$watch(
        "vm.model",
        function(newPhone, oldPhone) {
            console.log("oldPhone", oldPhone);
            console.log("newPhone", newPhone);
            var isOldSameAsNew = oldPhone.number == newPhone.number;
            if (newPhone.number.replace("-", "").length == 10 && !isOldSameAsNew) {
                number = newPhone.calling_code.replace("+", "") + newPhone.number;
                $phoneHelper
                    .validate(number)
                    .then(function(response) {
                        console.log("response", response);
                    })
                    .catch(function(err) {
                        console.log("err", err);
                    });
            }
        },
        true
    );
}

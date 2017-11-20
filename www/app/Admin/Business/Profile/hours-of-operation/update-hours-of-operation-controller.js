export default function UpdateHoursOfOperationController(locals, BusinessesService, $state, $dialogHelper) {
    var dialogProperties = locals.locals.dialogProperties;
    var businessId = locals.locals.model.businessId;
    var vm = this;
    vm.daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    vm.content = dialogProperties.dialogContent.contentHTML;
    vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;

    vm.title = dialogProperties.title;
    vm.submitText = dialogProperties.submitText;
    vm.cancelText = dialogProperties.cancelText;
    vm.phone = locals.locals.model.phone;
    vm.flexGtMd = "33";
    vm.flexMd = "33";
    vm.hoursOfOperation = locals.locals.model.hoursOfOperation;

    vm.form = {};
    vm.submit = submit;
    vm.cancel = cancel;

    //var originalForm = angular.copy(vm.model);

    function submit() {
        if (vm.form.$valid) {

            var hoursOfOperationObj = angular.copy(vm.hoursOfOperation);
            angular.forEach(hoursOfOperationObj, function (value, key, obj) {
                if (!value.isOpen) {
                    value.openTime = null;
                    value.closeTime = null;
                }
            });

            BusinessesService.profile.updateHoursOfOperation(businessId, hoursOfOperationObj)
                .then(function success(response) {
                        $state.reload();
                    },
                    function error(err) {
                        console.log(err);
                    }
                );
        }
    }

    function cancel() {
        $dialogHelper.hide();
    }
}
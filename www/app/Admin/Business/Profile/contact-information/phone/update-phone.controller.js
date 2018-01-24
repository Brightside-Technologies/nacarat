export default function UpdatePhoneController(
    $state,
    $dialogHelper,
    $errorHandler,
    $toastHelper,
    locals,
    BusinessesService
) {
    var dialogProperties = locals.locals.dialogProperties;
    var businessId = locals.locals.model.businessId;
    var vm = this;
    vm.content = dialogProperties.dialogContent.contentHTML;
    vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;

    vm.title = dialogProperties.title;
    vm.submitText = dialogProperties.submitText;
    vm.cancelText = dialogProperties.cancelText;
    vm.phone = locals.locals.model.phone;

    vm.flexGtMd = "33";
    vm.flexMd = "33";

    vm.form = {};
    vm.submit = submit;
    vm.cancel = cancel;

    //var originalForm = angular.copy(vm.model);

    function submit() {
        console.log("vm.phone", vm.phone);
        if (vm.form.$valid) {
            BusinessesService.profile
                .updatePhone(businessId, vm.phone)
                .then(function success(response) {
                    $dialogHelper.hide();
                    $toastHelper.showSuccess("Phone updated successfully");
                    $state.reload();
                })
                .catch($errorHandler);
        }
    }

    function cancel() {
        $dialogHelper.hide();
    }
}

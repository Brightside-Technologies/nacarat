export default function UpdateAddressController(
    $state,
    $dialogHelper,
    $errorHandler,
    $toastHelper,
    locals,
    BusinessesService
) {
    var dialogProperties = locals.locals.dialogProperties;
    var businessId = locals.locals.model.businessId;
    var merchantId = locals.locals.model.merchantId;
    var vm = this;
    vm.content = dialogProperties.dialogContent.contentHTML;
    vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;
    vm.title = dialogProperties.title;
    vm.submitText = dialogProperties.submitText;
    vm.cancelText = dialogProperties.cancelText;
    vm.address = locals.locals.model.address;
    vm.form = {};
    vm.submit = submit;
    vm.cancel = cancel;

    //var originalForm = angular.copy(vm.model);

    function submit() {
        if (vm.form.$valid) {
            BusinessesService.profile
                .putAddress(merchantId, businessId, vm.address)
                .then(function() {
                    $dialogHelper.hide();
                    $toastHelper.showSuccess("Address updated successfully");
                    $state.reload();
                })
                .catch($errorHandler);
        }
    }

    function cancel() {
        $dialogHelper.hide();
    }
}

import $errorHandler from "../../../../../../assets/helpers/error-handler";

export default function UpdateEmailController(
    locals,
    BusinessesService,
    $dialogHelper,
    $toastHelper,
    $state,
    $errorHandler
) {
    var dialogProperties = locals.locals.dialogProperties;
    var vm = this;
    vm.content = dialogProperties.dialogContent.contentHTML;
    vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;

    vm.title = dialogProperties.title;
    vm.submitText = dialogProperties.submitText;
    vm.cancelText = dialogProperties.cancelText;
    vm.model = locals.locals.model;

    vm.form = {};
    vm.submit = submit;
    vm.cancel = cancel;

    //var originalForm = angular.copy(vm.model);

    function submit() {
        if (vm.form.$valid) {
            BusinessesService.profile
                .updateEmail(vm.model.merchantId, vm.model.businessId, vm.model.email)
                .then(function() {
                    $state.reload();
                    $dialogHelper.hide();
                    $toastHelper.showSuccess("Business name has been updated sucessfully");
                })
                .catch($errorHandler);
        }
    }

    function cancel() {
        $dialogHelper.hide();
    }
}

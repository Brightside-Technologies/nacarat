export default function UpdatePhoneController(locals, BusinessesService, $state, $dialogHelper) {
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
        if (vm.form.$valid) {
            BusinessesService.profile.updatePhone(businessId, vm.phone).then(
                function success(response) {
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

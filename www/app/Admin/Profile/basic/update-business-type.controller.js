export default function UpdateBusinessTypeController($dialogHelper, $state, locals, EnumsService, BusinessesService) {
    var dialogProperties = locals.locals.dialogProperties;
    var businessId = locals.locals.model.businessId;
    var vm = this;
    vm.content = dialogProperties.dialogContent.contentHTML;
    vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;
    vm.businessTypes = [];
    vm.title = dialogProperties.title;
    vm.submitText = dialogProperties.submitText;
    vm.cancelText = dialogProperties.cancelText;
    vm.businessType = locals.locals.model.businessType;
    vm.flexGtMd = "33";
    vm.flexMd = "33";
    vm.form = {};
    vm.submit = submit;
    vm.cancel = cancel;

    init()

    function init() {
        EnumsService.getBusinessTypes()
            .then(function (response) {
                vm.businessTypes = response.data;
            })
    }


    //var originalForm = angular.copy(vm.model);

    function submit() {
        if (vm.form.$valid) {
            BusinessesService.profile.updateType(businessId, vm.businessType)
                .then(function (response) {
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
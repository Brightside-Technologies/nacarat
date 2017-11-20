export default function UpdateEmailController(locals, BusinessesService, $dialogHelper, $state) {
  var dialogProperties = locals.locals.dialogProperties;
  var vm = this;
  vm.content = dialogProperties.dialogContent.contentHTML;
  vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;

  vm.title = dialogProperties.title;
  vm.submitText = dialogProperties.submitText;
  vm.cancelText = dialogProperties.cancelText;
  vm.model = locals.locals.model;
  vm.flexGtMd = "33";
  vm.flexMd = "33";
  console.log(vm.model);

  vm.form = {};
  vm.submit = submit;
  vm.cancel = cancel;

  //var originalForm = angular.copy(vm.model);

  function submit() {
    if (vm.form.$valid) {
      BusinessesService.profile.updateEmail(vm.model.businessId, vm.model.email)
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
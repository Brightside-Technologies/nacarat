// TODO: show toast when action succeeds or fails
// TODO: Check that the form has changed before submitting
// TODO: Add validation
export default function UpdateAboutController(locals, BusinessesService, $dialogHelper, $state) {
  var businessId = locals.locals.model.businessId;
  var dialogProperties = locals.locals.dialogProperties;
  var vm = this;
  vm.content = dialogProperties.dialogContent.contentHTML;
  vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;

  vm.title = dialogProperties.title;
  vm.submitText = dialogProperties.submitText;
  vm.cancelText = dialogProperties.cancelText;
  vm.about = locals.locals.model.about;
  vm.flexGtMd = "33";
  vm.flexMd = "33";

  vm.form = {};
  vm.submit = submit;
  vm.cancel = cancel;

  //var originalForm = angular.copy(vm.model);

  function submit() {
    if (vm.form.$valid) {
      BusinessesService.profile.updateAbout(businessId, vm.about)
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
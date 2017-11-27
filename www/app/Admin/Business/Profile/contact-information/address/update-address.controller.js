export default function UpdateAddressController(locals, $dialogHelper) {
  var dialogProperties = locals.locals.dialogProperties;
  var vm = this;
  vm.content = dialogProperties.dialogContent.contentHTML;
  vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;

  vm.title = dialogProperties.title;
  vm.submitText = dialogProperties.submitText;
  vm.cancelText = dialogProperties.cancelText;
  vm.address = locals.locals.model.address;
  vm.flexGtMd = "33";
  vm.flexMd = "33";
  console.log(vm.address);

  vm.form = {};
  vm.submit = submit;
  vm.cancel = cancel;

  //var originalForm = angular.copy(vm.model);

  function submit() {
    if (vm.form.$valid) {
      console.log("vm.address", vm.address);
      console.log("SUBMIT");
    }
  }

  function cancel() {
    $dialogHelper.hide();
  }
}

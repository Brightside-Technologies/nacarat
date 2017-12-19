export default function AddSocialMediaController($toastHelper, $dialogHelper, $state, locals, EnumsService, BusinessesService) {
    var dialogProperties = locals.locals.dialogProperties;
    var businessId = locals.locals.model.businessId;
    var vm = this;
    vm.content = dialogProperties.dialogContent.contentHTML;
    vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;
    vm.socialMediaTypes = [];
    vm.title = dialogProperties.title;
    vm.submitText = dialogProperties.submitText;
    vm.cancelText = dialogProperties.cancelText;
    vm.socialMediaType = "";
    vm.socialMedia = {
        url: "",
        display: ""
    };
    vm.flexGtMd = "33";
    vm.flexMd = "33";

    vm.form = {};
    vm.submit = submit;
    vm.cancel = cancel;

    init();

    function init() {
        EnumsService.getSocialMediaTypes().then(function(response) {
            vm.socialMediaTypes = response.data;
        });
    }

    function submit() {
        if (vm.form.$valid) {
            var socialMediaObject = {};
            socialMediaObject[vm.socialMediaType.toLowerCase()] = vm.socialMedia;
            BusinessesService.profile.addSocialMedia(businessId, socialMediaObject).then(
                function(response) {
                    $toastHelper.showSuccess("Social media added successfully");
                    $state.reload();
                },
                function error(err) {
                    $toastHelper.showError("An error occurred. Please try again");
                    console.log(err);
                }
            );
        }
    }

    function cancel() {
        $dialogHelper.hide();
    }
}

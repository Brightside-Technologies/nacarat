// TODO: Refactor ContactInformation to not be arrays
// TODO: Implement DELETE social media
var dialogFormTemplate = require('../../../assets/templates/dialog-form.tmpl.html');
export default function ProfileController(VendorService, $dialogHelper, User) {
    var vendorId = User.storeId;
    var vm = this;
    vm.vendorProfile = {};
    vm.showUpdateAboutUs = showUpdateAboutUs;
    vm.showDeleteContactInfo = showDeleteContactInfo;
    vm.showDeleteSocialMedia = showDeleteSocialMedia;
    vm.showUpdateSocialMedia = showUpdateSocialMedia;
    vm.showUpdateContactInfo = showUpdateContactInfo;

    init();

    function init() {
        VendorService.get(vendorId)
            .then(function(response) {
                    console.log(response);
                    vm.vendorProfile = response.data.profile;
                },
                function error(err) {
                    console.log("err", err);
                });
    }

    function showUpdateAboutUs(ev, model) {
        var content = [
            '<md-input-container class="md-block" flex>',
            '<label>About Us</label>',
            '<textarea ng-model="vm.model.about" rows="5" md-maxlength-"180" md-select-on-focus></textarea>',
            '</md-input-container>'
        ].join('').replace(/\s\s+/g, '');

        var locals = {
            model: { vendorId: vendorId, about: model },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update 'About Us' description",
                submitText: "Update",
                cancelText: "Cancel"
            }
        };
        var opts = {};
        opts.controller = 'UpdateAboutController';
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }

    function showDeleteContactInfo(ev, record) {
        var opts = {};
        opts.target = ev;
        opts.title = "Delete Contact Information?";
        opts.htmlContent = "<strong>" + record.type + "</strong> entry" + " will be deleted";
        opts.ariaLabel = "Delete " + record.type;
        opts.okLabel = "Delete";
        opts.cancelLabel = "Cancel";
        opts.confirm = confirm;
        $dialogHelper.showConfirm(opts);

        function confirm() {
            console.log('DELETE');
        }
    }

    function showDeleteSocialMedia(ev, record) {
        console.log(record);
        var opts = {};
        opts.target = ev;
        opts.title = "Delete Social Media Entry?";
        opts.htmlContent = "<strong>" + record.type + "</strong> entry" + " will be deleted";
        opts.ariaLabel = "Delete " + record.type;
        opts.okLabel = "Delete";
        opts.cancelLabel = "Cancel";
        opts.confirm = confirm;
        $dialogHelper.showConfirm(opts);

        function confirm() {
            console.log('DELETE');
        }
    }

    function showUpdateSocialMedia(ev, model) {

        var content = [
            '<md-input-container class="md-block" flex>',
            '<label>Display</label>',
            '<input ng-model="vm.model.model.data.display">',
            '</md-input-container>',
            '<md-input-container class="md-block" flex>',
            '<label>Url</label>',
            '<input ng-model="vm.model.model.data.url">',
            '</md-input-container>'
        ].join('').replace(/\s\s+/g, '');

        var locals = {
            model: { vendorId: vendorId, model: model },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update " + model.type + " entry",
                submitText: "Update",
                cancelText: "Cancel"
            }
        };
        var opts = {};
        opts.controller = 'UpdateSocialMediaController';
        opts.template = dialogFormTemplate
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }

    function showUpdateContactInfo(ev, model) {

        var controller = "";
        if (model.type == "Phone") {
            controller = "UpdatePhoneController";
        } else if (model.type == "Email") {
            controller = "UpdateEmailController";
        } else if (model.type == "Address") {
            controller = "UpdateAddressController";
        }

        var content = [
            '<md-input-container class="md-block" flex>',
            '<label>' + model.type + '</label>',
            '<input ng-model="vm.model.value">',
            '</md-input-container>'
        ].join('').replace(/\s\s+/g, '');

        var locals = {
            model: model,
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update " + model.type,
                submitText: "Update",
                cancelText: "Cancel"
            }
        };

        var opts = {};
        opts.controller = controller;
        opts.template = dialogFormTemplate
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }
}
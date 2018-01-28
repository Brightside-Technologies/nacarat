// TODO: Need different layouts for "Business" view and "Merchant" view. Mainly, sidenav is different
// TODO: Style dialog buttons
// TODO: Updates to Business profile should be applied to businesses AND merchant/business
var dialogFormTemplate = require("../../../../assets/templates/dialog-form.tmpl.html");
export default function ProfileController(
    $scope,
    $errorHandler,
    $state,
    $stateParams,
    $dialogHelper,
    $toastHelper,
    Business,
    Merchant,
    BusinessesService
) {
    var businessId = Business.id;
    var merchantId = Merchant.id;
    var vm = this;
    vm.disableUpdateHoursOfOperationButton = true;
    vm.showUpdateHoursOfOperation = showUpdateHoursOfOperation;
    vm.updateHoursByDay = updateHoursByDay;
    vm.daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    vm.businessProfile = Business.profile;
    vm.showUpdateBusinessName = showUpdateBusinessName;
    vm.showUpdateBusinessType = showUpdateBusinessType;
    vm.showUpdateAboutUs = showUpdateAboutUs;
    vm.showUpdateEmail = showUpdateEmail;
    vm.showUpdatePhone = showUpdatePhone;
    vm.showUpdateAddress = showUpdateAddress;
    vm.showUpdateSocialMedia = showUpdateSocialMedia;
    vm.showDeleteSocialMedia = showDeleteSocialMedia;
    vm.fabOptions = {
        animation: "md-scale",
        position: "md-fab-bottom-right",
        direction: "up",
        trigger: {
            label: "Add phone, email, address, or social media",
            icon: "add",
            class: "",
            toolTip: true
        },
        actions: [
            {
                label: "Add Phone",
                toolTip: true,
                class: "",
                icon: "phone",
                action: showAddPhone
            },
            {
                label: "Add Email",
                toolTip: true,
                class: "",
                icon: "mail",
                action: showAddEmail
            },
            {
                label: "Add Address",
                toolTip: true,
                class: "",
                icon: "location_on",
                action: showAddAddress
            },
            {
                label: "Add Social Media",
                toolTip: true,
                class: "",
                icon: "public",
                action: showAddSocialMedia
            }
        ]
    };

    var originalHoursOfOperation = angular.copy(vm.businessProfile.hoursOfOperation);
    var hasHoursChanged = false;
    var allOpenTimesSet = false;
    var hoursOfOperationValues = [];
    var openDaysWithNullHours = [];
    $scope.$watch(
        "vm.businessProfile.hoursOfOperation",
        function(newHoursOfOperation) {
            hasHoursChanged = !_.isEqual(newHoursOfOperation, originalHoursOfOperation);
            hoursOfOperationValues = _.values(newHoursOfOperation);
            openDaysWithNullHours = _.filter(hoursOfOperationValues, function(data) {
                return data.isOpen && !!data.openTime == false && !!data.closeTime == false;
            });
            vm.disableUpdateHoursOfOperationButton = !hasHoursChanged && !openDaysWithNullHours.length > 0;
        },
        true
    );

    function showUpdateBusinessName(ev, model) {
        var content = [
            '<md-input-container class="md-block" flex>',
            "<label>Business Name</label>",
            '<input ng-model="vm.businessName"/>',
            "</md-input-container>"
        ]
            .join("")
            .replace(/\s\s+/g, "");

        var locals = {
            model: {
                businessId: businessId,
                merchantId: merchantId,
                businessName: model
            },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update Business Name",
                submitText: "Update",
                cancelText: "Cancel"
            }
        };

        var opts = {};
        opts.controller = "UpdateBusinessNameController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }

    function showUpdateAboutUs(ev, model) {
        var content = [
            '<md-input-container class="md-block" flex>',
            "<label>About Us</label>",
            '<textarea ng-model="vm.about" rows="5" md-maxlength-"180" md-select-on-focus></textarea>',
            "</md-input-container>"
        ]
            .join("")
            .replace(/\s\s+/g, "");

        var locals = {
            model: {
                businessId: businessId,
                about: model
            },
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
        opts.controller = "UpdateAboutController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }

    function showUpdateBusinessType(ev, model) {
        var content = [
            '<md-input-container class="md-block" flex>',
            "<label>Type</label>",
            '<md-select ng-model="vm.businessType">',
            '<md-option ng-repeat="type in vm.businessTypes | orderBy: \'name\' track by $index" value="{{type.name}}">',
            "{{type.name}}",
            " </md-option>",
            "</md-select>",
            "</md-input-container>"
        ]
            .join("")
            .replace(/\s\s+/g, "");

        var locals = {
            model: {
                businessId: businessId,
                businessType: model
            },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update Business Type",
                submitText: "Update",
                cancelText: "Cancel"
            }
        };

        var opts = {};
        opts.controller = "UpdateBusinessTypeController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }

    //#region Address
    function showAddAddress(ev) {}

    function showUpdateAddress(ev, model) {
        var locals = {
            model: {
                businessId: businessId,
                merchantId: merchantId,
                address: model
            },
            dialogProperties: {
                dialogContent: {
                    contentHTML: "<address model='vm.address'></address>"
                },
                title: "Update Address",
                submitText: "Update",
                cancelText: "Cancel"
            }
        };

        var opts = {};
        opts.controller = "UpdateAddressController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }
    //#endregion

    //#region Hours of Operations
    function showUpdateHoursOfOperation(ev) {
        var opts = {};
        opts.target = ev;
        opts.title = "Update Hours?";
        opts.htmlContent = "Hours of operation will be updated for <b>" + vm.businessProfile.name + "</b>";
        opts.ariaLabel = "Update Hours";
        opts.okLabel = "Update";
        opts.cancelLabel = "Cancel";
        opts.confirm = confirm;
        $dialogHelper.showConfirm(opts);

        function confirm() {
            var hoursOfOperationObj = angular.copy(vm.businessProfile.hoursOfOperation);
            angular.forEach(hoursOfOperationObj, function(value, key, obj) {
                if (!value.isOpen) {
                    value.openTime = null;
                    value.closeTime = null;
                }
            });

            BusinessesService.profile
                .updateHoursOfOperation(businessId, hoursOfOperationObj)
                .then(function success(response) {
                    $state.reload();
                    $toastHelper.showSuccess("Hours of operation updated successfully");
                })
                .catch($errorHandler);
        }
    }

    function updateHoursByDay(ev, hoursOfOperationByDay, day) {
        var content = [
            '<div flex layout="column" layout-padding>',
            '<div layout flex layout-align="center center">',
            "<label>Open</label>",
            '<md-time-picker ng-model="vm.openTime" mandatory="required" no-auto-switch></md-time-picker>',
            "</div>",
            '<div layout flex layout-align="center center">',
            "<label>Close</label>",
            '<md-time-picker ng-model="vm.closeTime" mandatory="required" no-auto-switch></md-time-picker>',
            "</div>",
            "</div>"
        ]
            .join("")
            .replace(/\s\s+/g, "");

        var locals = {
            model: {
                businessId: businessId,
                hoursOfOperation: hoursOfOperationByDay
            },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update Hours for " + day,
                submitText: "Ok",
                cancelText: "Cancel"
            }
        };
        var opts = {};
        opts.controller = UpdateHoursByDay;
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper
            .showCustom(opts)
            .then(function(response) {
                if (response) {
                    vm.businessProfile.hoursOfOperation[day].openTime = response.openTime;
                    vm.businessProfile.hoursOfOperation[day].closeTime = response.closeTime;
                }
            })
            .catch($errorHandler);

        function UpdateHoursByDay(locals) {
            var dialogProperties = locals.locals.dialogProperties;
            var vm = this;
            vm.content = dialogProperties.dialogContent.contentHTML;
            vm.contentPath = dialogProperties.dialogContent.contentTemplateUrl;
            vm.title = dialogProperties.title;
            vm.submitText = dialogProperties.submitText;
            vm.cancelText = dialogProperties.cancelText;
            vm.hoursOfOperation = angular.copy(locals.locals.model.hoursOfOperation);
            vm.cancel = cancel;
            vm.submit = submit;

            vm.openTime = moment(angular.copy(vm.hoursOfOperation).openTime || new Date()).toDate();
            vm.closeTime = moment(angular.copy(vm.hoursOfOperation).closeTime || new Date()).toDate();

            function cancel() {
                $dialogHelper.hide();
            }

            function submit() {
                vm.hoursOfOperation.openTime = moment(vm.openTime).valueOf();
                vm.hoursOfOperation.closeTime = moment(vm.closeTime).valueOf();

                $dialogHelper.hide(vm.hoursOfOperation);
            }
        }
    }
    //#endregion

    //#region Phones
    function showAddPhone(ev) {}

    function showUpdatePhone(ev, model) {
        var content = '<phone model="vm.phone"></phone>';

        var locals = {
            model: {
                businessId: businessId,
                phone: model
            },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update Phone",
                submitText: "Update",
                cancelText: "Cancel"
            }
        };

        var opts = {};
        opts.controller = "UpdatePhoneController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };

        $dialogHelper.showCustom(opts);
    }
    //#endregion

    //#region Email
    function showAddEmail(ev) {}

    function showUpdateEmail(ev, model) {
        var content = [
            '<md-input-container class="md-block" flex>',
            "<label>Email</label>",
            '<input ng-model="vm.model.email">',
            "</md-input-container>"
        ]
            .join("")
            .replace(/\s\s+/g, "");

        var locals = {
            model: {
                businessId: businessId,
                merchantId: merchantId,
                email: model
            },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Update Email",
                submitText: "Update",
                cancelText: "Cancel"
            }
        };

        var opts = {};
        opts.controller = "UpdateEmailController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }
    //#endregion

    //#region Social Media
    function showAddSocialMedia(ev) {
        var content = [
            '<md-input-container class="md-block" flex>',
            "<label>Type</label>",
            '<md-select ng-model="vm.socialMediaType">',
            '<md-option ng-repeat="type in vm.socialMediaTypes | orderBy: \'name\' track by $index" value="{{type.name}}">',
            "{{type.name}}",
            " </md-option>",
            "</md-select>",
            "</md-input-container>",
            '<md-input-container class="md-block" flex>',
            "<label>Display</label>",
            '<input ng-model="vm.socialMedia.display">',
            "</md-input-container>",
            '<md-input-container class="md-block" flex>',
            "<label>Url</label>",
            '<input ng-model="vm.socialMedia.url">',
            "</md-input-container>"
        ]
            .join("")
            .replace(/\s\s+/g, "");

        var locals = {
            model: {
                businessId: businessId
            },
            dialogProperties: {
                dialogContent: {
                    contentHTML: content
                },
                title: "Add Social Media",
                submitText: "Add",
                cancelText: "Cancel"
            }
        };
        var opts = {};
        opts.controller = "AddSocialMediaController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }

    function showUpdateSocialMedia(ev, model) {
        var content = [
            '<md-input-container class="md-block" flex>',
            "<label>Display</label>",
            '<input ng-model="vm.model.model.data.display">',
            "</md-input-container>",
            '<md-input-container class="md-block" flex>',
            "<label>Url</label>",
            '<input ng-model="vm.model.model.data.url">',
            "</md-input-container>"
        ]
            .join("")
            .replace(/\s\s+/g, "");

        var locals = {
            model: {
                businessId: businessId,
                model: model
            },
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
        opts.controller = "UpdateSocialMediaController";
        opts.template = dialogFormTemplate;
        opts.target = ev;
        opts.openFrom = angular.element(ev.toElement);
        opts.closeTo = angular.element(ev.toElement);
        opts.locals = {
            locals: locals
        };
        $dialogHelper.showCustom(opts);
    }

    function showDeleteSocialMedia(ev, socialMedia) {
        // $state.go('admin.root.business.profile.delete-social-media', {
        //   socialMediaType: socialMedia.type
        // });

        var opts = {};
        opts.target = ev;
        opts.title = "Delete Social Media Entry?";
        opts.htmlContent = "<strong>" + socialMedia.type + "</strong> entry" + " will be deleted";
        opts.ariaLabel = "Delete " + socialMedia.type;
        opts.okLabel = "Delete";
        opts.cancelLabel = "Cancel";
        opts.confirm = confirm;
        $dialogHelper.showConfirm(opts);

        function confirm() {
            BusinessesService.profile.deleteSocialMedia(businessId, socialMedia.type).then(
                function success() {
                    $toastHelper.showSuccess("Social media deleted successfully");
                    $state.reload();
                },
                function error(err) {
                    $toastHelper.showError("Error has occurred. Please try again");
                }
            );
        }
    }
    //#endregion
}

// TODO: Need different layouts for "Business" view and "Merchant" view. Mainly, sidenav is different
// TODO: Style dialog buttons
// TODO: Add $mdToast to all Success and Error callbacks
// TODO: Updates to Business profile should be applied to businesses AND merchant/business 
var dialogFormTemplate = require("../../../../assets/templates/dialog-form.tmpl.html");
export default function ProfileController($state, $stateParams, $dialogHelper, Business, BusinessesService) {
  var businessId = Business.id;
  var vm = this;
  vm.daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  vm.businessProfile = Business.profile;
  vm.showUpdateBusinessName = showUpdateBusinessName;
  vm.showUpdateBusinessType = showUpdateBusinessType;
  vm.showUpdateAboutUs = showUpdateAboutUs;
  vm.showUpdateEmail = showUpdateEmail;
  vm.showUpdatePhone = showUpdatePhone;
  vm.showUpdateSocialMedia = showUpdateSocialMedia;
  vm.showUpdateHoursOfOperation = showUpdateHoursOfOperation;
  vm.showAddSocialMedia = showAddSocialMedia;
  vm.showDeleteSocialMedia = showDeleteSocialMedia;

  init();

  function init() {}

  function showUpdateBusinessName(ev, model) {
    var content = [
      '<md-input-container class="md-block" flex>',
      "<label>Business Name</label>",
      '<input ng-model="vm.businessName"/>',
      "</md-input-container>"
    ].join("").replace(/\s\s+/g, "");

    var locals = {
      model: {
        businessId: businessId,
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
    ].join("").replace(/\s\s+/g, "");

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
      '<label>Type</label>',
      '<md-select ng-model="vm.businessType">',
      '<md-option ng-repeat="type in vm.businessTypes | orderBy: \'name\' track by $index" value="{{type.name}}">',
      '{{type.name}}',
      ' </md-option>',
      '</md-select>',
      "</md-input-container>"
    ].join("").replace(/\s\s+/g, "");

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

  function showUpdateEmail(ev, model) {
    var content = [
      '<md-input-container class="md-block" flex>',
      "<label>Email</label>",
      '<input ng-model="vm.model.email">',
      "</md-input-container>"
    ].join("").replace(/\s\s+/g, "");

    var locals = {
      model: {
        businessId: businessId,
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

  function showUpdatePhone(ev, model) {
    var content = [
      '<div layout flex>',
      '<md-input-container class="md-block" flex>',
      "<label>Code</label>",
      '<input ng-model="vm.phone.calling_code">',
      '</md-input-container>',
      '<md-input-container class="md-block" flex>',
      '<label>Number</label>',
      '<input ng-model="vm.phone.number">',
      '</md-input-container>',
      '</div>'
    ].join("").replace(/\s\s+/g, "");

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

  function showUpdateHoursOfOperation(ev, model) {
    var content = require('./hours-of-operation/hours-of-operation.tmpl.html');

    var locals = {
      model: {
        businessId: businessId,
        hoursOfOperation: model
      },
      dialogProperties: {
        dialogContent: {
          contentHTML: content
        },
        title: "Update hours of operation",
        submitText: "Update",
        cancelText: "Cancel"
      }
    };
    var opts = {};
    opts.controller = "UpdateHoursOfOperationController";
    opts.template = dialogFormTemplate;
    opts.target = ev;
    opts.openFrom = angular.element(ev.toElement);
    opts.closeTo = angular.element(ev.toElement);
    opts.locals = {
      locals: locals
    };
    $dialogHelper.showCustom(opts);
  }

  function showAddSocialMedia(ev) {
    var content = [
      '<md-input-container class="md-block" flex>',
      '<label>Type</label>',
      '<md-select ng-model="vm.socialMediaType">',
      '<md-option ng-repeat="type in vm.socialMediaTypes | orderBy: \'name\' track by $index" value="{{type.name}}">',
      '{{type.name}}',
      ' </md-option>',
      '</md-select>',
      "</md-input-container>",
      '<md-input-container class="md-block" flex>',
      "<label>Display</label>",
      '<input ng-model="vm.socialMedia.display">',
      "</md-input-container>",
      '<md-input-container class="md-block" flex>',
      "<label>Url</label>",
      '<input ng-model="vm.socialMedia.url">',
      "</md-input-container>"
    ].join("").replace(/\s\s+/g, "");

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
    console.log(socialMedia);
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
      BusinessesService.profile.deleteSocialMedia(businessId, socialMedia.type)
        .then(function success() {
            $state.reload();
          },
          function error(err) {
            console.log(err);
          });
    }
  }

}
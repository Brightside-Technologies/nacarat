// TODO: Implement DELETE social media
// TODO: Need different layouts for "Business" view and "Merchant" view. Mainly, sidenav is different
// TODO: Style dialog buttons
// TODO: Need a $mdToast helper?
// TODO: Need global error handler 
// TODO: Updates to Business profile should be applied to businesses AND merchant/business 
var dialogFormTemplate = require("../../../assets/templates/dialog-form.tmpl.html");
export default function ProfileController($state, $stateParams, $dialogHelper, Business, BusinessesService) {
  var businessId = Business.id;
  var vm = this;
  vm.businessProfile = Business.profile;
  vm.showUpdateBusinessName = showUpdateBusinessName;
  vm.showUpdateAboutUs = showUpdateAboutUs;
  vm.showUpdateEmail = showUpdateEmail;
  vm.showUpdatePhone = showUpdatePhone;
  vm.showUpdateSocialMedia = showUpdateSocialMedia;
  vm.showDeleteSocialMedia = showDeleteSocialMedia;

  init();

  function init() {}

  function showUpdateBusinessName(ev, model) {
    console.log('model', model);
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
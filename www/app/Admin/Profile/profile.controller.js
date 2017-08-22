(function() {
  'use strict';

  angular
    .module('Admin.Profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    'VendorService',
    '$dialogHelper'
  ];

  function ProfileController(VendorService, $dialogHelper) {
    var vendorId = '8b9846d7-9df4-440c-8bbc-88b8a9fc7217';
    var vm = this;
    vm.vendor = {};
    vm.showUpdateAboutUs = showUpdateAboutUs;
    vm.showDeleteContactInfo = showDeleteContactInfo;
    vm.showDeleteSocialMedia = showDeleteSocialMedia;
    vm.showUpdateSocialMedia = showUpdateSocialMedia;
    vm.showUpdateContactInfo = showUpdateContactInfo;

    init();

    function init() {
      VendorService.get(vendorId)
        .then(function(response) {
            vm.vendor = response.data.data[vendorId];
            console.log('vendor', vm.vendor);
          },
          function error(err) {
            console.log("err", err);
          });
    }

    function showUpdateAboutUs(ev, model) {
      var content = [
        '<md-input-container class="md-block" flex>',
        '<label>About Us</label>',
        '<textarea ng-model="vm.model.about" rows="5" md-select-on-focus></textarea>',
        '</md-input-container>'
      ].join('').replace(/\s\s+/g, '');

      var locals = {
        model: model,
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
      opts.controller = 'UpdateSocialMediaController';
      opts.templateUrl = './assets/templates/dialog-form.tmpl.html';
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
        '<label>' + model.type + '</label>',
        '<input ng-model="vm.model.description">',
        '</md-input-container>'
      ].join('').replace(/\s\s+/g, '');

      var locals = {
        model: model,
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
      opts.templateUrl = './assets/templates/dialog-form.tmpl.html';
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
      opts.templateUrl = './assets/templates/dialog-form.tmpl.html';
      opts.target = ev;
      opts.openFrom = angular.element(ev.toElement);
      opts.closeTo = angular.element(ev.toElement);
      opts.locals = {
        locals: locals
      };
      $dialogHelper.showCustom(opts);
    }
  }
})();

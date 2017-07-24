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
    vm.showDeleteContactInfo = showDeleteContactInfo;
    vm.showDeleteSocialMedia = showDeleteSocialMedia;
    vm.showUpdateSocialMedia = showUpdateSocialMedia;

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
        '<md-input-container>',
          '<label>'+ model.type +'</label>',
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
      opts.templateUrl = 'www/assets/templates/dialog-form.tmpl.html';
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

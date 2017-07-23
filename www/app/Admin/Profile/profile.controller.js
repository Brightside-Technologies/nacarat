(function() {
  'use strict';

  angular
    .module('Admin.Profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['VendorService', '$dialogHelper'];

  function ProfileController(VendorService, $dialogHelper) {
    var vendorId = '8b9846d7-9df4-440c-8bbc-88b8a9fc7217';
    var vm = this;
    vm.vendor = {};
    vm.showDeleteSocial = showDeleteSocial;
    vm.showDeleteContactInfo = showDeleteContactInfo;

    init();

    function init() {
      VendorService.get(vendorId)
        .then(function(response) {
            vm.vendor = response.data.data[vendorId];
            console.log('vendor', vm.vendor);
          },
          function error(err) {
            console.log("err", err);
          })
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

    function showDeleteSocial(ev, record) {
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

    // function showEditDialog(ev, model, controller, contentTemplateUrl, contentHTML) {
    //   var locals = {
    //     model: model,
    //     dialogContent: {
    //       contentHTML: contentHTML,
    //       contentTemplateUrl: contentTemplateUrl
    //     }
    //   }
    //   var opts = {};
    //   opts.controller = controller;
    //   opts.templateUrl = 'assets/templates/dialog-form.tmpl.html';
    //   opts.target = ev;
    //   opts.openFrom = angular.element(ev.toElement);
    //   opts.closeTo = angular.element(ev.toElement);
    //   opts.locals = {
    //     locals: locals
    //   };
    //   DialogService.showCustom(opts);
    // }
  }
})();

import angular from 'angular';
import ProfileController from './profile.controller';
import AddSocialMediaController from './social-media/add-social-media.controller';
import UpdateSocialMediaController from './social-media/update-social-media.controller';
import UpdateAddressController from './contact-information/address/update-address.controller';
import UpdateEmailController from './contact-information/email/update-email.controller';
import UpdatePhoneController from './contact-information/phone/update-phone.controller';

export default angular.module('Admin_Profile', [])
  .controller('ProfileController', ProfileController)
  .controller('AddSocialMediaController', AddSocialMediaController)
  .controller('UpdateSocialMediaController', UpdateSocialMediaController)
  .controller('UpdateAddressController', UpdateAddressController)
  .controller('UpdateEmailController', UpdateEmailController)
  .controller('UpdatePhoneController', UpdatePhoneController)
  .name;

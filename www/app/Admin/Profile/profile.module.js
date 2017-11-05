import HoursOfOperation from './hours-of-operation/hours-of-operation.module';
import ProfileController from './profile.controller';
import AddSocialMediaController from './social-media/add-social-media.controller';
import UpdateSocialMediaController from './social-media/update-social-media.controller';
import UpdateAddressController from './contact-information/address/update-address.controller';
import UpdateEmailController from './contact-information/email/update-email.controller';
import UpdatePhoneController from './contact-information/phone/update-phone.controller';
import UpdateAboutController from './basic/update-about.controller';
import UpdateBusinessNameController from './basic/update-business-name.controller';

export default angular.module('Admin_Profile', [HoursOfOperation])
    .controller('ProfileController', ProfileController)
    .controller('AddSocialMediaController', AddSocialMediaController)
    .controller('UpdateSocialMediaController', UpdateSocialMediaController)
    .controller('UpdateAddressController', UpdateAddressController)
    .controller('UpdateEmailController', UpdateEmailController)
    .controller('UpdatePhoneController', UpdatePhoneController)
    .controller('UpdateAboutController', UpdateAboutController)
    .controller('UpdateBusinessNameController', UpdateBusinessNameController)
    .name;
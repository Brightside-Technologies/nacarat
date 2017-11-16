import HoursOfOperation from './hours-of-operation/hours-of-operation.module';
import ContactInformation from './contact-information/contact-information.module';
import SocialMedia from './social-media/social-media.module';

import ProfileController from './profile.controller';
import UpdateAboutController from './basic/update-about.controller';
import UpdateBusinessNameController from './basic/update-business-name.controller';
import UpdateBusinessTypeController from './basic/update-business-type.controller';

export default angular.module('Admin_Profile', [
        HoursOfOperation,
        ContactInformation,
        SocialMedia
    ])
    .controller('ProfileController', ProfileController)
    .controller('UpdateAboutController', UpdateAboutController)
    .controller('UpdateBusinessNameController', UpdateBusinessNameController)
    .controller('UpdateBusinessTypeController', UpdateBusinessTypeController)
    .name;
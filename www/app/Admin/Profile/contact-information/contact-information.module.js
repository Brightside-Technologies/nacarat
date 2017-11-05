import UpdateAddressController from './address/update-address.controller';
import UpdateEmailController from './email/update-email.controller';
import UpdatePhoneController from './phone/update-phone.controller';

export default angular.module('ContactInformation', [])
    .controller('UpdateAddressController', UpdateAddressController)
    .controller('UpdateEmailController', UpdateEmailController)
    .controller('UpdatePhoneController', UpdatePhoneController)
    .name;
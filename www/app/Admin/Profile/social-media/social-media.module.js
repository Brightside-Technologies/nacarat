import AddSocialMediaController from './add-social-media.controller';
import UpdateSocialMediaController from './update-social-media.controller';

export default angular.module('SocialMedia', [])
    .controller('AddSocialMediaController', AddSocialMediaController)
    .controller('UpdateSocialMediaController', UpdateSocialMediaController)
    .name;
// TODO: get Express to work with updateAbout
export default function VendorService($http, config) {
    var baseUrl = config.baseUrl;
    var service = this;
    service.profile = {};

    service.query = getAllVendors;
    service.get = getVendorById;
    service.profile.updateSocialMedia = updateSocialMedia;
    service.profile.updateAbout = updateAbout;

    function getAllVendors() {
        var url = baseUrl + '/vendors.json';
        return $http({
            url: url,
            method: 'GET'
        });
    }

    function getVendorById(vendorId) {
        var url = baseUrl + '/vendors/' + vendorId + '.json';
        return $http({
            url: url,
            method: 'GET'
        });
    }

    function updateSocialMedia(vendorId, type, data) {
        var url = baseUrl + '/vendors/' + vendorId + '/profile/socialMedias/' + type + '.json';
        return $http({
            url: url,
            method: 'PUT',
            data: data
        });
    }

    function updateAbout(vendorId, data) {
        var url = baseUrl + '/vendors/' + vendorId + '/profile/about.json';
        return $http({
            url: url,
            method: 'PUT',
            data: angular.toJson(data)
        });
    }
}
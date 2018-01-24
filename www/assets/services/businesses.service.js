// NOTE: wont work locall with updateAbout, updateEmail, updateName

export default function BusinessesService($http, config) {
    var baseUrl = config.baseUrl;
    var service = this;
    service.profile = {};

    service.query = getAllBusinesses;
    service.get = getBusinessById;
    service.profile.updateSocialMedia = updateSocialMedia;
    service.profile.updateName = updateBusinessName;
    service.profile.updateAbout = updateAbout;
    service.profile.updateType = updateBusinessType;
    service.profile.updateEmail = updateEmail;
    service.profile.updatePhone = updatePhone;
    service.profile.updateHoursOfOperation = updateHoursOfOperation;
    service.profile.deleteSocialMedia = deleteSocialMedia;
    service.profile.addSocialMedia = addSocialMedia;
    service.profile.addPhone = addPhone;

    function getAllBusinesses() {
        var url = baseUrl + "/businesses.json";
        return $http({
            url: url,
            method: "GET"
        });
    }

    function getBusinessById(businessId) {
        var url = baseUrl + "/businesses/" + businessId + ".json";
        return $http({
            url: url,
            method: "GET"
        });
    }

    function updateSocialMedia(businessId, socialMediaType, data) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/socialMedias/" + socialMediaType + ".json";
        return $http({
            url: url,
            method: "PUT",
            data: data
        });
    }

    function updateAbout(businessId, aboutText) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/about.json";
        return $http({
            url: url,
            method: "PUT",
            data: angular.toJson(aboutText)
        });
    }

    function updateBusinessType(businessId, businessType) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/type.json";
        return $http({
            url: url,
            method: "PUT",
            data: angular.toJson(businessType)
        });
    }

    function updateBusinessName(businessId, businessName) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/name.json";
        return $http({
            url: url,
            method: "PUT",
            data: angular.toJson(businessName)
        });
    }

    function updateEmail(businessId, email) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/email.json";
        return $http({
            url: url,
            method: "PUT",
            data: angular.toJson(email)
        });
    }

    function updatePhone(businessId, phoneObj) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/phone.json";
        return $http({
            url: url,
            method: "PUT",
            data: phoneObj
        });
    }

    function updateHoursOfOperation(businessId, hoursOfOperationObj) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/hoursOfOperation.json";
        return $http({
            url: url,
            method: "PUT",
            data: hoursOfOperationObj
        });
    }

    function deleteSocialMedia(businessId, socialMediaType) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/socialMedias/" + socialMediaType + ".json";
        return $http({
            url: url,
            method: "DELETE"
        });
    }

    function addSocialMedia(businessId, socialMediaObj) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/socialMedias.json";
        return $http({
            url: url,
            method: "PATCH",
            data: socialMediaObj
        });
    }

    function addPhone(businessId, phoneObj) {
        var url = baseUrl + "/businesses/" + businessId + "/profile/phone.json";
        return $http({
            url: url,
            method: "PATCH",
            data: phoneObj
        });
    }
}

// NOTE: wont work locall with updateAbout, updateEmail

export default function BusinessesService($http, config) {
  var baseUrl = config.baseUrl;
  var service = this;
  service.profile = {};

  service.query = getAllBusinesses;
  service.get = getBusinessById;
  service.profile.updateSocialMedia = updateSocialMedia;
  service.profile.updateAbout = updateAbout;
  service.profile.updateEmail = updateEmail;
  service.profile.updatePhone = updatePhone;
  service.profile.deleteSocialMedia = deleteSocialMedia;

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
    var url = baseUrl + "/businesses/" + businessId + "/profile/socialMedias/" + type + ".json";
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

  function deleteSocialMedia(businessId, socialMediaType) {
    var url = baseUrl + "/businesses/" + businessId + "/profile/socialMedias/" + socialMediaType + ".json";
    return $http({
      url: url,
      method: "DELETE"
    });
  }
}
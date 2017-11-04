export default function MerchantsService($http, config) {
  var baseUrl = config.baseUrl;
  var service = this;

  service.query = getAllMerchants;
  service.get = getMerchantById;
  service.getByUserId = getMerchantByUserId;

  function getAllMerchants() {
    var url = baseUrl + "/merchants.json";
    return $http({
      url: url,
      method: "GET"
    });
  }

  function getMerchantById(merchantId) {
    var url = baseUrl + "/merchants/" + merchantId + ".json";
    return $http({
      url: url,
      method: "GET"
    });
  }

  function getMerchantByUserId(userId) {
    var url = baseUrl + '/merchants.json?orderBy="userId"&equalTo="' + userId + '"';
    return $http({
      url: url,
      method: "GET"
    });
  }
}

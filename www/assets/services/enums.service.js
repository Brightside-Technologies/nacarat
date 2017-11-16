export default function EnumsService($http, config) {
    var baseUrl = config.baseUrl;
    var service = this;

    service.getSocialMediaTypes = getSocialMediaTypes;
    service.getBusinessTypes = getBusinessTypes;

    function getSocialMediaTypes() {
        var url = baseUrl + "/enums/socialMediaTypes.json";
        return $http({
            url: url,
            method: "GET"
        });
    }

    function getBusinessTypes() {
        var url = baseUrl + "/enums/businessTypes.json";
        return $http({
            url: url,
            method: "GET"
        });
    }
}
export default function EnumsService($http, config) {
    var baseUrl = config.baseUrl;
    var service = this;

    service.getSocialMediaTypes = getSocialMediaTypes;

    function getSocialMediaTypes() {
        var url = baseUrl + "/enums/socialMediaTypes.json";
        return $http({
            url: url,
            method: "GET"
        });
    }
}
export default function $phoneHelper($http) {
    //var authId = "34224525918469434";
    //var authId = "3aced146-1319-b2ca-f7ab-6a7a2ac6d9df";
    var apiToken = "73dc8393a70d33f544559425a9ef7431";
    //var url = https://numvalidate.com/api/validate?number=12015550123

    var helper = this;

    helper.validate = validate;

    function validate(number) {
        return $http({
            method: "GET",
            url: "https://numvalidate.com/api/validate",
            params: {
                number: number
            },
            headers: {
                //"x-api-token": apiToken
                Authorization: apiToken
            }
        });
    }
}

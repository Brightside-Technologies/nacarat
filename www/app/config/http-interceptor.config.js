export default function HttpInterceptor($rootScope, $q) {
    return {
        request: function(config) {
            return config || $q.when(config);
        },
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
        response: function(response) {
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            $rootScope.$broadcast("responseError", rejection);
            return $q.reject(rejection);
        }
    };
}

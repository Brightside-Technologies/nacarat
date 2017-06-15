(function() {
    'use strict';

    angular
        .module('Nacarat.Services')
        .service('DailyDealsService', DailyDealsService);

    DailyDealsService.$inject = [
        '$resource'
    ];

    function DailyDealsService($resource) {
        //TODO: Define url in app.constant()
        var url = "127.0.0.1:3000";
        var DailyDealsResource = $resource(url + '/daily-deals/:vendorId', {
            vendorId: '@vendorId'
        }, {
            query: {
                isArray: true
            }
        });

        return DailyDealsResource;
    }
})();

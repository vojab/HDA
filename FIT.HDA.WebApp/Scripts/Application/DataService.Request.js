define('DataService.Request',
    ['amplify'],
    function (amplify) {
        var init = function () {

            // Pass Resource Id, Request Type, and Settings
            amplify.request.define('GetRequests', 'ajax', {
                url: 'http://localhost:3894/api/RequestAPI',
                dataType: 'jsonp',
                type: 'GET'
            });

        },
            getRequests = function (callbacks) {
                return amplify.request({
                    resourceId: 'GetRequests',
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getRequests: getRequests
        };
    });
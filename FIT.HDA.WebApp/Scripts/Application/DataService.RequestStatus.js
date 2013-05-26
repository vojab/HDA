define('DataService.RequestStatus',
    ['amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('GetRequestStatusOptions', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/RequestStatusAPI',
                dataType: 'jsonp',
                type: 'GET'
            });
        },

        getRequestStatusOptions = function (callbacks) {
            return amplify.request({
                resourceId: 'GetRequestStatusOptions',
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getRequestStatusOptions: getRequestStatusOptions
        };
    });
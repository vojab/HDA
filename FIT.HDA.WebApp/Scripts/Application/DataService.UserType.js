define('DataService.UserType',
    ['amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('GetUserTypes', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/UserTypeAPI',
                dataType: 'jsonp',
                type: 'GET'
            });
        },

        getUserTypes = function (callbacks) {
            return amplify.request({
                resourceId: 'GetUserTypes',
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getUserTypes: getUserTypes
        };
    });
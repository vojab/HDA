define('DataService.User',
    ['amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('GetUserByUserNameANdPassword', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/UserAPI',
                dataType: 'jsonp',
                type: 'GET'
            });
        },

        getUserByUserNameAndPassword = function (callbacks, username, password) {
            return amplify.request({
                resourceId: 'GetUserByUserNameANdPassword',
                data: {
                    username: username,
                    password: password
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getUserByUserNameAndPassword: getUserByUserNameAndPassword
        };
    });
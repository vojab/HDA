define('DataService.User',
    ['amplify'],
    function (amplify) {
        var init = function () {
            
            amplify.request.define('GetUsers', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/UserAPI',
                dataType: 'jsonp',
                type: 'GET'
            });

            amplify.request.define('GetUserByUserNameAndPassword', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/UserAPI',
                dataType: 'jsonp',
                type: 'GET'
            });
            
            amplify.request.define('SaveUser', 'ajax', {
                url: 'http://localhost:3894/api/UserAPI/save?userdescription={userdescription}&usertypeid={usertypeid}&password={password}&username={username}',
                dataType: 'jsonp',
                type: 'GET'
            });
            
            amplify.request.define('DeleteUser', 'ajax', {
                url: 'http://localhost:3894/api/UserAPI',
                dataType: 'jsonp',
                type: 'GET'
            });
        },
            
        getUsers = function (callbacks) {
            return amplify.request({
                resourceId: 'GetUsers',
                success: callbacks.success,
                error: callbacks.error
            });
        };

        getUserByUserNameAndPassword = function (callbacks, username, password) {
            return amplify.request({
                resourceId: 'GetUserByUserNameAndPassword',
                data: {
                    username: username,
                    password: password
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };
        
        saveUser = function (callbacks, userdescription, usertypeid, password, username) {
            return amplify.request({
                resourceId: 'SaveUser',
                data: {
                    userdescription: userdescription,
                    usertypeid: usertypeid,
                    password: password,
                    username: username
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };
        
        deleteUser = function (callbacks, userid) {
            return amplify.request({
                resourceId: 'DeleteUser',
                data: {
                    userid: userid
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getUsers: getUsers,
            getUserByUserNameAndPassword: getUserByUserNameAndPassword,
            saveUser: saveUser,
            deleteUser: deleteUser
        };
    });
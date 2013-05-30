define('DataService.AssignedUserChanges',
    ['amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('SaveAssignedUserChange', 'ajax', {
                url: 'http://localhost:3894/api/AssignedUserChangesAPI/SaveAssignedUserChange?userid={userid}&requestid={requestid}',
                dataType: 'jsonp',
                type: 'GET'
            });

        },

        saveAssignedUserChange = function (callbacks, userid, requestid) {
            return amplify.request({
                resourceId: 'SaveAssignedUserChange',
                data: {
                    userid: userid,
                    requestid: requestid
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            saveAssignedUserChange: saveAssignedUserChange
        };
    });
define('DataService.RequestStatusChanges',
    ['amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('SaveRequestStatusChange', 'ajax', {
                url: 'http://localhost:3894/api/RequestStatusChangesAPI/SaveRequestStatusChange?requeststatusid={requeststatusid}&requestid={requestid}',
                dataType: 'jsonp',
                type: 'GET'
            });

        },

        saveRequestStatusChange = function (callbacks, requeststatusid, requestid) {
            return amplify.request({
                resourceId: 'SaveRequestStatusChange',
                data: {
                    requeststatusid: requeststatusid,
                    requestid: requestid
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            saveRequestStatusChange: saveRequestStatusChange
        };
    });
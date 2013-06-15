define('DataService.Request',
    ['amplify'],
    function (amplify) {
        var init = function () {
           
            // Pass Resource Id, Request Type, and Settings
            amplify.request.define('GetRequests', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/RequestAPI',
                dataType: 'jsonp',
                type: 'GET'
            });
            
            amplify.request.define('GetRequestsByUserId', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/RequestAPI',
                dataType: 'jsonp',
                type: 'GET'
            });

            amplify.request.define('PostRequest', 'ajax', {
                url: 'http://localhost:3894/api/RequestAPI',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            });
            
            amplify.request.define('SaveRequest', 'ajax', {
                url: 'http://localhost:3894/api/RequestAPI/save?requestsubject={requestsubject}&requestdescription={requestdescription}&productid={productid}&userid={userid}',
                dataType: 'jsonp',
                type: 'GET'
            });
            
            amplify.request.define('DeleteRequest', 'ajax', {
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
        
        getRequestsByUserId = function (callbacks, userid) {
            return amplify.request({
                resourceId: 'GetRequestsByUserId',
                data: {
                    userid: userid
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        saveRequest = function (callbacks, requestsubject, requestdescription, productid, userid) {
            return amplify.request({
                resourceId: 'SaveRequest',
                data: {
                    requestsubject: requestsubject,
                    requestdescription: requestdescription,
                    productid: productid,
                    userid: userid
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        deleteRequest = function (callbacks, requestid) {
            return amplify.request({
                resourceId: 'DeleteRequest',
                data: {
                    requestid: requestid
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getRequests: getRequests,
            getRequestsByUserId: getRequestsByUserId,
            saveRequest: saveRequest,
            deleteRequest: deleteRequest
        };
    });
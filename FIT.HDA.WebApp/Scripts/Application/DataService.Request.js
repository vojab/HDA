define('DataService.Request',
    ['amplify'],
    function (amplify) {
        var init = function () {
            
            //amplify.request.decoders.appEnvelope =
            //    function (data, status, xhr, success, error) {
            //        try {
            //            if (data && data.status) {
            //                if (data.status === "success") {
            //                    success(data.data);
            //                } else if (data.status === "fail" || data.status === "error") {
            //                    error(data.message, data.status);
            //                } else {
            //                    error(data.message, "fatal");
            //                }
            //            } else {
            //                error('Cannot load requests');
            //            }
            //        } catch (e) {
            //            error('Exception was thrown - Cannot load requests');
            //        }
            //    };

            // Pass Resource Id, Request Type, and Settings
            amplify.request.define('GetRequests', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/RequestAPI',
                dataType: 'jsonp',
                type: 'GET'//,
                //decoder: "appEnvelope"
            });

            amplify.request.define('PostRequest', 'ajax', {
                url: 'http://localhost:3894/api/RequestAPI',
                dataType: 'json',
                type: 'POST',
                //decoder: "appEnvelope",
                contentType: 'application/json; charset=utf-8'
            });
            
            amplify.request.define('SaveRequest', 'ajax', {
                url: 'http://localhost:3894/api/RequestAPI/save?requestdescription={requestdescription}&productid={productid}&userid={userid}',
                dataType: 'jsonp',
                type: 'GET'//,
                //decoder: "appEnvelope"
            });

        },
            
        getRequests = function (callbacks) {
            return amplify.request({
                resourceId: 'GetRequests',
                success: callbacks.success,
                error: callbacks.error
            });
        };

        saveRequest = function (callbacks, requestdescription, productid, userid) {
            return amplify.request({
                resourceId: 'SaveRequest',
                data: {
                    requestdescription: requestdescription,
                    productid: productid,
                    userid: userid
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getRequests: getRequests,
            saveRequest: saveRequest
        };
    });
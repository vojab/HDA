﻿define('DataService.Employee',
    ['amplify'],
    function (amplify) {
        var init = function () {

            // Pass Resource Id, Request Type, and Settings
            amplify.request.define('GetEmployees', 'ajax', {
                url: 'http://localhost:3894/api/EmployeeAPI',
                dataType: 'json',
                type: 'GET'
            });

        },
        getEmployees = function (callbacks) {
            return amplify.request({
                resourceId: 'GetEmployees',
                data: {  },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getEmployees: getEmployees
        };
    });
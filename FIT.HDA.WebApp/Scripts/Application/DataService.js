define('DataService',
    ['DataService.Employee', 'DataService.Request', 'DataService.User', 'DataService.RequestStatus'],
    function (employee, request, user, requestStatus) {
        return {
            employee: employee,
            request: request,
            user: user,
            requestStatus: requestStatus
        };
    });
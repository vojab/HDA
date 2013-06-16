define('DataService',
    ['DataService.Employee',
        'DataService.Request',
        'DataService.User',
        'DataService.RequestStatus',
        'DataService.Product',
        'DataService.AssignedUserChanges',
        'DataService.RequestStatusChanges',
        'DataService.UserType'],
    function (employee,
        request,
        user,
        requestStatus,
        product,
        assigneduserchanges,
        requeststatuschanges,
        usertypes) {
        return {
            employee: employee,
            request: request,
            user: user,
            requestStatus: requestStatus,
            product: product,
            assigneduserchanges: assigneduserchanges,
            requeststatuschanges: requeststatuschanges,
            usertypes: usertypes
        };
    });
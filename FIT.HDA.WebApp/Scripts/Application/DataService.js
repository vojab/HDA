define('DataService',
    ['DataService.Employee',
        'DataService.Request',
        'DataService.User',
        'DataService.RequestStatus',
        'DataService.Product'],
    function (employee,
        request,
        user,
        requestStatus,
        product) {
        return {
            employee: employee,
            request: request,
            user: user,
            requestStatus: requestStatus,
            product: product
        };
    });
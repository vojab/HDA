define('DataService',
    ['DataService.Employee', 'DataService.Request', 'DataService.User'],
    function (employee, request, user) {
        return {
            employee: employee,
            request: request,
            user: user
        };
    });
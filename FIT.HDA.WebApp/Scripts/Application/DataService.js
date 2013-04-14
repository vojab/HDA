define('DataService',
    ['DataService.Employee', 'DataService.Request'],
    function (employee, request) {
        return {
            employee: employee,
            request: request
        };
    });
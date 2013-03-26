define('DataService',
    ['DataService.Employee'],
    function (employee) {
        return {
            employee: employee
        };
    });
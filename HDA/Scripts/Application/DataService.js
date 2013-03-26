define('DataService',
    [
        'DataService.Employee'
    ],
    function (Employee) {
        return {
            Employee: Employee
        };
    });
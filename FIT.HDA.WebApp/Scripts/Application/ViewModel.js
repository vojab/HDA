/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy'],
    function ($, ko, cookie, dataService, underscore, sammy) {
        var that = this;

        initialize = function () {
            alert('run Lola run!');
        };

        loadEmployees = function () {
            dataService.employee.getEmployees({
                success: function (result) {
                    alert(result);
                },
                error: function () {
                    alert('error');
                }
            });
        };

        return {
            initialize: initialize,
            loadEmployees: loadEmployees
        };
    });
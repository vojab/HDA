/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy'],
    function ($, ko, cookie, dataService, underscore, sammy) {
        var that = this;

        initialize = function () {
            
        };

        loadEmployees = function () {
            dataService.Employee.getEmployees({
                success: function (result) {
                    alert(result);
                    toastr.success('Loading employees');
                },
                error: function () {

                }
            });
        };

        return {
            initialize: initialize,
            loadEmployees: loadEmployees
        };
    });
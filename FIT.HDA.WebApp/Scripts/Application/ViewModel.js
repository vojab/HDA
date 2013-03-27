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
                    WriteResponse(result);
                    alert(result);
                },
                error: function () {
                    alert('error');
                }
            });
        };
        
        WriteResponse = function(employees) {
            var strResult = "<table><th>EmpID</th><th>Emp Name</th><th>Emp Department</th><th>Mobile No</th>";
            $.each(employees, function (index, employee) {
                strResult += "<tr><td>" + employee.EmployeeId + "</td><td> " + employee.EmployeeName + "</td><td>" +
                    employee.EmployeeDepartment + "</td><td>" + employee.EmployeeMobile + "</td></tr>";
            });
            strResult += "</table>";
            $("#divResult").html(strResult);
        }

        return {
            initialize: initialize,
            loadEmployees: loadEmployees
        };
    });
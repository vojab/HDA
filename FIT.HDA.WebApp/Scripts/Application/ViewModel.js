/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy', 'model'],
    function ($, ko, cookie, dataService, underscore, sammy, model) {
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
        
        loadRequests = function () {
            dataService.request.getRequests({
                success: function (result) {
                    alert(result);
                    that.bindRequestData(result[0]);
                },
                error: function () {
                    alert('error');
                }
            });
        };

        var requests = ko.observable();

        bindRequestData = function (result) {
            
            //var productData = {};
            //productData.ProductId = result.Product.ProductId;
            //productData.ProductName = result.Product.ProductName;
            //productData.ProductDescription = result.Product.ProductDescription;
            //productData.DateCreated = result.Product.DateCreated;
            
            //var requestsData = {};
            //requestsData.RequestId = result.RequestId;
            //requestsData.RequestDescription = result.RequestDescription;
            //requestsData.RequestReadyForArchive = result.RequestReadyForArchive;
            //requestsData.RequestOpenDate = result.RequestOpenDate;
            //requestsData.RequestClosedDate = result.RequestClosedDate;
            //requestsData.DateCreated = result.DateCreated;
            //requestsData.ProductId = result.ProductId;
            //requestsData.Product = productData;
            
            //that.requests = new model.request(requestsData);
            that.requests = new model.request(result);
            
            ko.applyBindings(that.requests);
            //that.renderMyStatistics();
        };

        WriteResponse = function(employees) {
            var strResult = "<table><th>EmpID</th><th>Emp Name</th><th>Emp Department</th><th>Mobile No</th>";
            $.each(employees, function(index, employee) {
                strResult += "<tr><td>" + employee.EmployeeId + "</td><td> " + employee.EmployeeName + "</td><td>" +
                    employee.EmployeeDepartment + "</td><td>" + employee.EmployeeMobile + "</td></tr>";
            });
            strResult += "</table>";
            $("#divResult").html(strResult);
        };

        return {
            initialize: initialize,
            loadEmployees: loadEmployees,
            loadRequests: loadRequests,
            requests: requests
        };
    });
/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy', 'model', 'bootstrap'],
    function ($, ko, cookie, dataService, underscore, sammy, model, bootstrap) {
        var that = this;

        initialize = function () {
            alert('run Lola run!');
            that.loadRequests();
        };
        
        // ----- Knockout Observable Section -----
        
        // Knockout Observable for Help Desk Requests
        //request = ko.observable();
        requests = ko.observableArray([]);
        
        // ----- --------------------------- -----
        
        loadRequests = function () {
            dataService.request.getRequests({
                success: function (result) {
                    //alert(result);
                    that.bindRequestData(result);
                },
                error: function () {
                    alert('Error');
                }
            });
        };

        // Function for binding JSON requests data to the knockout observable
        bindRequestData = function (result) {
            
            //that.requests(ko.mapping.fromJS(result));

            //var hdaRequests = [];
            for (var i = 0; i < result.length; i++) {
                that.requests.push(new model.request(result[i]));
            }
            
            ko.applyBindings(that.requests);
        };

        return {
            initialize: initialize,
            loadRequests: loadRequests,
            requests: requests
        };
    });
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
        request = ko.observable();
        requests = ko.observableArray([]);

        currentRequestIndex = ko.observable(0);
        
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
            for (var i = 0; i < result.length; i++) {
                that.requests.push(new model.request(result[i]));
            }
            that.renderRequests();
            ko.applyBindings(that.requests);
        };
        
        // Apply template to target div and render requests data
        renderRequests = function () {
            try {
                var selector = "#requestsArea";
                $(selector).attr("data-bind", "template: { name: 'requestsTemplate' }");
            } catch (e) {
                console.log('Exception was thrown - Could not render requests');
                //that.redirectToErrorPage();
            }
        };
        
        // HELPER FUNCTION SECTION TODO: Extract to separate module
        openRequest = function (currentData) {
            request(currentData);
            renderRequestIntoModal();
            $('#requestModal').modal('show');
        };
        
        // Apply template to target div and render requests data
        renderRequestIntoModal = function () {
            try {
                var selector = "#requestModalArea";
                $(selector).attr("data-bind", "template: { name: 'requestModalTemplate', data: request }");
                ko.cleanNode($('#requestModalArea'));
                ko.applyBindings(that.requests);
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();
            }
        };
        
        // UTIL FUNCTION SECTION TODO: Extract to separate module

        return {
            initialize: initialize,
            loadRequests: loadRequests,
            openRequest: openRequest,
            request: request,
            requests: requests,
            renderRequestIntoModal: renderRequestIntoModal,
            currentRequestIndex: currentRequestIndex
        };
    });
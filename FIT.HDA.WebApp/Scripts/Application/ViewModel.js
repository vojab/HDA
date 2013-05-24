/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy', 'model', 'bootstrap'],
    function ($, ko, cookie, dataService, underscore, sammy, model, bootstrap) {
        var that = this;

        initialize = function () {
            //alert('run Lola run!');
            that.loadRequests();
        };
        
        // ----- Knockout Observable Section -----
        
        // Knockout Observable for Help Desk Requests
        selectedRequest = ko.observable(new model.request());
        newRequest = ko.observable(new model.request());
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
            for (var i = 0; i < result.length; i++) {
                that.requests.push(new model.request(result[i]));
            }
            that.renderRequests();
            ko.applyBindings(that);
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

        saveRequest = function () {
            dataService.request.saveRequest({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, that.newRequest().RequestDescription(), that.newRequest().ProductId());

            //dataService.request.saveRequest({
            //    success: function () {
            //        console.log('request is saved !');
            //    },
            //    error: function () {
            //        console.log('error');
            //    }
            //}, ko.toJSON(that.newRequest));
            //$.ajax({
            //    url:'http://localhost:3894/api/RequestAPI/save?requestdescription="voja"',
            //    //data: 'voja',
            //    dataType: 'json',
            //    //dataType: "iframe",
            //    //async: true,
            //    //contentType: 'application/json; charset=utf-8',
            //    type: 'GET'
            //}).success(function () {
            //    console.log('saved !');
            //}).error(function (message) {
            //    console.log('error !');
            //    //that.errorHandler(message);
            //});
        };
        
        // HELPER FUNCTION SECTION TODO: Extract to separate module
        openRequest = function (currentData) {
            selectedRequest(currentData);
            renderRequestIntoModal();
            $('#requestModal').modal('show');
        };
        
        // Apply template to target div and render requests data
        renderRequestIntoModal = function () {
            try {
                var selector = "#requestModalArea";
                $(selector).attr("data-bind", "template: { name: 'requestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#requestModalArea'));
                ko.applyBindings(that.requests, document.getElementById("requestModalArea"));
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
            saveRequest: saveRequest,
            selectedRequest: selectedRequest,
            newRequest: newRequest,
            requests: requests,
            renderRequestIntoModal: renderRequestIntoModal
        };
    });
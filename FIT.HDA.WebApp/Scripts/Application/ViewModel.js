/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy', 'model', 'bootstrap'],
    function ($, ko, cookie, dataService, underscore, sammy, model, bootstrap) {
        var that = this;

        initialize = function () {
            //alert('run Lola run!');
            that.loadUser();
            that.loadUsers();
            that.loadProducts();
            that.loadRequestStatusOptions();
            that.loadRequests();
        };
        
        // ----- Knockout Observable Section -----
        
        // Knockout Observable for Help Desk Requests
        selectedRequest = ko.observable(new model.request());
        newRequest = ko.observable(new model.request());
        requests = ko.observableArray([]);
        filteredRequestsByKeyword = ko.observableArray([]);
        filteredRequestsByRequestStatus = ko.observableArray([]);
        keywordFilter = ko.observable("");
        requestStatusFilter = ko.observable("");
        loggedInUser = ko.observable(new model.user());
        users = ko.observableArray([]);
        selectedUser = ko.observable([]);
        products = ko.observableArray([]);
        selectedProduct = ko.observable([]);
        requestStatusOptions = ko.observableArray([]);
        selectedRequestStatusOption = ko.observable([]);
        
        // ----- --------------------------- -----
        
        loadUsers = function () {
            dataService.user.getUsers({
                success: function (result) {
                    that.bindUsersData(result);
                    //console.log(result);
                },
                error: function () {
                    console.log('error !');
                }
            });
        };
        
        bindUsersData = function (result) {
            for (var i = 0; i < result.length; i++) {
                var currentUser = new model.user(result[i]);
                that.users.push(currentUser);
            }

            //that.renderRequests();
            //ko.applyBindings(that);
        };
        
        // TODO: User will be loaded from Log In page - this is temporary for testing
        loadUser = function () {
            dataService.user.getUserByUserNameAndPassword({
                success: function (result) {
                    that.bindUserData(result);
                    //console.log(result);
                },
                error: function () {
                    console.log('error !');
                }
            }, 'vojab', 'test'); // TODO: Remove temporary hardcoded values
        };
        
        // Function for binding JSON requests data to the knockout observable
        bindUserData = function (result) {
            that.loggedInUser(new model.user(result));

            //that.renderRequests();
            //ko.applyBindings(that);
        };
        
        loadProducts = function () {
            dataService.product.getProducts({
                success: function (result) {
                    that.bindProductsData(result);
                    //console.log(result);
                },
                error: function () {
                    console.log('error !');
                }
            });
        };

        bindProductsData = function (result) {
            for (var i = 0; i < result.length; i++) {
                var currentProduct = new model.product(result[i]);
                that.products.push(currentProduct);
            }

            //that.renderRequests();
            //ko.applyBindings(that);
        };
        
        loadRequestStatusOptions = function () {
            dataService.requestStatus.getRequestStatusOptions({
                success: function (result) {
                    that.bindRequestStatusOptionsData(result);
                    //console.log(result);
                },
                error: function () {
                    console.log('error !');
                }
            });
        };
        
        bindRequestStatusOptionsData = function (result) {
            // Add to the top ALL options for all request status
            var allRequestStatusOption = new model.requestStatus();
            allRequestStatusOption.RequestStatusId(0);
            allRequestStatusOption.RequestStatusValue(0);
            allRequestStatusOption.RequestStatusName("ALL");
            that.requestStatusOptions.push(allRequestStatusOption);
            for (var i = 0; i < result.length; i++) {
                var currentRequestStatusOption = new model.requestStatus(result[i]);
                that.requestStatusOptions.push(currentRequestStatusOption);
            }

            //that.renderRequests();
            //ko.applyBindings(that);
        };
        
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
                var currentRequest = result[i];
                
                // Find request status in request status changes with highest id (that is latest and current)
                var currentRequestStatusChangesObject = 
                    _.max(currentRequest.RequestStatusChanges, function (requestStatusChangesObject) {
                        return requestStatusChangesObject.RequestStatusChangesId;
                    });
                currentRequest.currentRequestStatus = currentRequestStatusChangesObject.RequestStatus;

                // Find user in assigned user changes with highest id (that is latest and current)
                var currentAssignedUserChangesObject =
                    _.max(currentRequest.AssignedUserChanges, function (assignedUserChangesObject) {
                        return assignedUserChangesObject.AssignedUserChangesId;
                    });
                currentRequest.currentAssignedUser = currentAssignedUserChangesObject.User;
                
                var currentRequestObservable = new model.request(currentRequest);
                that.requests.push(currentRequestObservable);
            }
            that.renderRequests();
            ko.applyBindings(that);
        };
        
        // Apply template to target div and render requests data
        renderRequests = function () {
            try {
                var selector = "#requestsArea";
                $(selector).attr("data-bind", "template: { name: 'requestsListTemplate' }");
            } catch (e) {
                console.log('Exception was thrown - Could not render requests');
                //that.redirectToErrorPage();
            }
        };

        saveRequest = function () {
            dataService.request.saveRequest({
                success: function (message) {
                    //TODO: save request status within other endpoint
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, that.newRequest().RequestDescription(), that.selectedProduct().ProductId(), that.loggedInUser().UserId());
        };
        
        openAssignToUserModal = function (currentData) {
            selectedRequest(currentData);
            renderUsersIntoModal();
            //$('#requestModal').modal('show');
        };
        
        // Apply template to target div and render requests data
        renderUsersIntoModal = function () {
            try {
                var selector = "#assignToUserModalArea";
                $(selector).attr("data-bind", "template: { name: 'assignToUserModalTemplate', data: users }");
                ko.cleanNode($('#assignToUserModalArea'));
                ko.applyBindings(that.users, document.getElementById("assignToUserModalArea"));
            } catch (e) {
                console.log('Exception was thrown - Could not render current users into modal');
                //that.redirectToErrorPage();
            }
        };

        assignToUser = function() {
            console.log(that.selectedUser().UserId());
            console.log(that.selectedRequest().RequestId());
            // TODO: Send only this two properties not User object under AssignedUserObjects
            
        };
        
        // HELPER FUNCTION SECTION TODO: Extract to separate module
        openRequest = function (currentData) {
            selectedRequest(currentData);
            renderRequestIntoModal();
            //$('#requestModal').modal('show');
        };
        
        // Apply template to target div and render requests data
        renderRequestIntoModal = function () {
            try {
                var selector = "#requestModalArea";
                $(selector).attr("data-bind", "template: { name: 'requestDetailsModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#requestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("requestModalArea"));
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();
            }
        };
        
        // Apply template to target div to render modal for creating new request
        openModalForNewRequest = function () {
            try {
                var selector = "#newRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'newRequestModalTemplate' }");
                //$('#newRequestModal').modal('show');
                ko.cleanNode($('#newRequestModalArea'));
                ko.applyBindings(that.newRequest, document.getElementById("newRequestModalArea"));
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();
            }
        };
        
        // Filter requests using the filter text
        that.filteredRequestsByKeyword = ko.computed(function () {
            var keywordFilter = that.keywordFilter().toLowerCase();
            if (!keywordFilter) {
                return that.requests();
            } else {
                return ko.utils.arrayFilter(that.requests(), function (request) {
                    return ko.utils.stringStartsWith(request.RequestDescription().toLowerCase(), keywordFilter);
                });
            }
        }, that);
        
        // Filter requests (which are already filtered by keyword) using the selected request status name
        that.filteredRequestsByRequestStatus = ko.computed(function () {
            // TODO: Move hardcoded value 'all' to the config
            var requestStatusFilter = 'all';
            if (selectedRequestStatusOption().RequestStatusName) {
                requestStatusFilter = selectedRequestStatusOption().RequestStatusName().toLowerCase();
            }
            if (!requestStatusFilter || requestStatusFilter === 'all') {
                return that.filteredRequestsByKeyword();
            } else {
                return ko.utils.arrayFilter(that.filteredRequestsByKeyword(), function (request) {
                    return ko.utils.stringStartsWith(request.CurrentRequestStatus().RequestStatusName().toLowerCase(), requestStatusFilter);
                });
            }
        }, that);
        
        // UTIL FUNCTION SECTION TODO: Extract to separate module

        return {
            initialize: initialize,
            loadRequests: loadRequests,
            openRequest: openRequest,
            openAssignToUserModal: openAssignToUserModal,
            assignToUser: assignToUser,
            saveRequest: saveRequest,
            selectedRequest: selectedRequest,
            newRequest: newRequest,
            requests: requests,
            loggedInUser: loggedInUser,
            users: users,
            selectedUser: selectedUser,
            products: products,
            selectedProduct: selectedProduct,
            requestStatusOptions: requestStatusOptions,
            selectedRequestStatusOption: selectedRequestStatusOption,
            keywordFilter: keywordFilter,
            requestStatusFilter: requestStatusFilter,
            filteredRequestsByKeyword: filteredRequestsByKeyword,
            filteredRequestsByRequestStatus: filteredRequestsByRequestStatus, 
            renderRequestIntoModal: renderRequestIntoModal,
            openModalForNewRequest: openModalForNewRequest
        };
    });
/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy', 'model', 'bootstrap', 'nicEdit'],
    function ($, ko, cookie, dataService, underscore, sammy, model, bootstrap, nicEdit) {
        var that = this;

        initialize = function () {
            // Load lookup data
            that.loadUsers();
            that.loadProducts();
            that.loadRequestStatusOptions();

            // TODO: Implement this line at the end
            //ko.applyBindings(that);
        };
        
        // ----- Knockout Custom Binders Section -----

        ko.bindingHandlers.nicedit = {
            init: function (element, valueAccessor) {
                var value = valueAccessor();
                var area = new nicEditor({ fullPanel: true }).panelInstance(element.id, { hasPanel: true });
                $(element).text(ko.utils.unwrapObservable(value));

                // Function for updating the right element whenever something changes
                var textAreaContentElement = $($(element).prev()[0].childNodes[0]);
                var areachangefc = function () {
                    value(textAreaContentElement.html());
                };

                // Make sure we update on both a text change, and when some HTML has been added/removed
                // (like for example a text being set to "bold")
                $(element).prev().keyup(areachangefc);
                $(element).prev().bind('DOMNodeInserted DOMNodeRemoved', areachangefc);
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                var textAreaContentElement = $($(element).prev()[0].childNodes[0]);
                textAreaContentElement.html(value());
            }
        };
        
        // ----- --------------------------- -----
        
        // ----- Knockout Observable Section -----
        
        // Knockout Observable for pages handling
        isUserAuthenticated = ko.observable(false);
        currentPage = ko.observable();
        
        loadAdminModule = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "ADMIN" && that.isUserAuthenticated() === true) {
                $("#adminModule").fadeIn();
                return true;
            }
        }, that);
        
        loadClientModule = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "CLIENT" && that.isUserAuthenticated() === true) {
                $("#clientModule").fadeIn();
                return true;
            }
        }, that);
        
        loadBusinessModule = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "BUSINESS" && that.isUserAuthenticated() === true) {
                $("#businessModule").fadeIn();
                return true;
            }
        }, that);
        
        loadHelpDeskModule = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "HELPDESK" && that.isUserAuthenticated() === true) {
                $("#helpDeskModule").fadeIn();
                return true;
            }
        }, that);
        
        // Knockout Observable for authentication
        loggedInUser = ko.observable(new model.user());
        userName = ko.observable();
        password = ko.observable();
        
        // Knockout Observable for Help Desk Requests
        selectedRequest = ko.observable(new model.request());
        newRequest = ko.observable(new model.request());
        requests = ko.observableArray([]);
        filteredRequestsByKeyword = ko.observableArray([]);
        filteredRequestsByRequestStatus = ko.observableArray([]);
        keywordFilter = ko.observable("");
        requestStatusFilter = ko.observable("");
        users = ko.observableArray([]);
        selectedUser = ko.observable([]);
        products = ko.observableArray([]);
        selectedProduct = ko.observable([]);
        requestStatusOptions = ko.observableArray([]);
        selectedRequestStatusOption = ko.observable([]);
        selectedFilterRequestStatusOption = ko.observable([]);
        
        // User types logged in
        
        admin = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            // ADMIN
            if (that.loggedInUser().UserTypeId() === 1) {
                return true;
            }
        }, that);

        client = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            // CLIENT
            if (that.loggedInUser().UserTypeId() === 3) {
                return true;
            }
        }, that);

        business = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            // BUSINESS
            if (that.loggedInUser().UserTypeId() === 4) {
                return true;
            }
        }, that);

        helpdesk = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            // HELP DESK
            if (that.loggedInUser().UserTypeId() === 2) {
                return true;
            }
        }, that);
        
        // ----- --------------------------- -----
        
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
            }, that.userName(), that.password());
        };
        
        // Function for binding JSON requests data to the knockout observable
        // TODO: Move hardcoded values to the config
        bindUserData = function (result) {
            if (result === 'badcredientials') {
                alert('Wrong Credientials');
                that.isUserAuthenticated(false);
            }
            else {
                // Parse returned string to the JSON object
                var jsonUser = $.parseJSON(result);
                // Bind retreived user to the observable
                that.loggedInUser(new model.user(jsonUser));
                // Mark authentication flag as true
                that.isUserAuthenticated(true);
                // Determine user type and by that load correct page
                var userType = that.loggedInUser().UserTypeId();
                switch(userType) {
                    case 1: // ADMIN
                        that.currentPage("ADMIN");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequests();
                        break;
                    case 2: // HELP DESK
                        that.currentPage("HELPDESK");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequests();
                        break;
                    case 3: // CLIENT
                        that.currentPage("CLIENT");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequests();
                        break;
                    case 4: // BUSINESS
                        that.currentPage("BUSINESS");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequests();
                        break;
                    default: // UNKNOWN
                        alert('Unknown user type');
                }
            }
            
            //that.renderRequests();
            //ko.applyBindings(that);
        };
        
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
            ko.applyBindings(that);
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
            // Empty requests array and fill with new data
            //that.requests(ko.observableArray([]));
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
                    //TODO: toaster message here
                    console.log(message);
                    $('#newRequestModal').modal('hide');
                    that.requests(ko.observableArray([]));
                    that.loadRequests();
                },
                error: function () {
                    console.log('error !');
                }
            }, that.newRequest().RequestSubject(),
               that.newRequest().RequestDescription(),
               that.selectedProduct().ProductId(),
               that.loggedInUser().UserId());
        };
        
        deleteRequest = function (currentData) {
            dataService.request.deleteRequest({
                success: function (message) {
                    //TODO: toaster message here
                    console.log(message);
                    that.requests(ko.observableArray([]));
                    that.loadRequests();
                },
                error: function () {
                    console.log('error !');
                }
            }, currentData.RequestId());
        };
        
        openChangeRequestsStatusModal = function (currentData) {
            selectedRequest(currentData);
            
            // Reset selected request status option
            selectedRequestStatusOption = ko.observable(new model.requestStatus());
            selectedRequestStatusOption().RequestStatusId(0);
            selectedRequestStatusOption().RequestStatusValue(0);
            selectedRequestStatusOption().RequestStatusName("ALL");

            renderRequestsStatusIntoModal();
        };
        
        // Apply template to target div and render requests status data
        renderRequestsStatusIntoModal = function () {
            try {
                var selector = "#changeRequestStatusModalArea";
                $(selector).attr("data-bind", "template: { name: 'changeRequestStatusModalTemplate', data: requestStatusOptions }");
                ko.cleanNode($('#changeRequestStatusModalArea'));
                ko.applyBindings(that.requestStatusOptions, document.getElementById("changeRequestStatusModalArea"));
            } catch (e) {
                console.log('Exception was thrown - Could not render requests status options into modal');
                //that.redirectToErrorPage();
            }
        };
        
        // Create entry in RequestStatusChanges table with currently selected requestid and requeststatusid
        changeRequestStatus = function () {
            // TODO: Move hardcoded value to the config
            if (selectedRequestStatusOption().RequestStatusName().toLowerCase() !== 'all') {
                dataService.requeststatuschanges.saveRequestStatusChange({
                    success: function (message) {
                        console.log(message);
                    },
                    error: function () {
                        console.log('error !');
                    }
                }, that.selectedRequestStatusOption().RequestStatusId(), that.selectedRequest().RequestId());
            }
            else {
                // TODO: Implement toaster message
                alert('Chose one of the valid status!');
            }
        };
        
        openAssignToUserModal = function (currentData) {
            selectedRequest(currentData);
            renderUsersIntoModal();
        };
        
        // Apply template to target div and render users data
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

        // Create entry in AssignedUserChanges table with currently selected userid and requestid
        assignToUser = function() {
            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, that.selectedUser().UserId(), that.selectedRequest().RequestId());
        };
        
        // HELPER FUNCTION SECTION TODO: Extract to separate module
        
        openAssignedUserHistory = function (currentData) {
            selectedRequest(currentData);
            renderAssignedUserHistoryIntoModal();
        };
        
        // Apply template to target div and render assigned users history data
        renderAssignedUserHistoryIntoModal = function () {
            try {
                var selector = "#assignedUserHistoryModalArea";
                $(selector).attr("data-bind", "template: { name: 'assignedUserHistoryModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#assignedUserHistoryModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("assignedUserHistoryModalArea"));
            } catch (e) {
                console.log('Exception was thrown - Could not render assigned users history into modal');
                //that.redirectToErrorPage();
            }
        };
        
        openRequestStatusHistory = function (currentData) {
            selectedRequest(currentData);
            renderRequestStatusHistoryIntoModal();
        };
        
        // Apply template to target div and render request status history data
        renderRequestStatusHistoryIntoModal = function () {
            try {
                var selector = "#requestStatusHistoryModalArea";
                $(selector).attr("data-bind", "template: { name: 'requestStatusHistoryModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#requestStatusHistoryModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("requestStatusHistoryModalArea"));
            } catch (e) {
                console.log('Exception was thrown - Could not render request status history into modal');
                //that.redirectToErrorPage();
            }
        };
        
        takeRequest = function (currentData) {
            //alert('Take request');
            selectedRequest(currentData);
            var selector = "#takeRequestModalArea";
            $(selector).attr("data-bind", "template: { name: 'takeRequestModalTemplate' }");
            ko.cleanNode($('#requestModalArea'));
            ko.applyBindings(that.selectedRequest, document.getElementById("takeRequestModalArea"));
            //$('#takeRequestModalArea').modal('show');
        };

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
                nicEditors.allTextAreas();
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
            if (selectedFilterRequestStatusOption().RequestStatusName) {
                requestStatusFilter = selectedFilterRequestStatusOption().RequestStatusName().toLowerCase();
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
            takeRequest: takeRequest,
            openRequest: openRequest,
            openAssignToUserModal: openAssignToUserModal,
            openChangeRequestsStatusModal: openChangeRequestsStatusModal,
            openRequestStatusHistory: openRequestStatusHistory,
            openAssignedUserHistory: openAssignedUserHistory,
            assignToUser: assignToUser,
            changeRequestStatus: changeRequestStatus,
            saveRequest: saveRequest,
            deleteRequest: deleteRequest,
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
            selectedFilterRequestStatusOption: selectedFilterRequestStatusOption,
            keywordFilter: keywordFilter,
            requestStatusFilter: requestStatusFilter,
            filteredRequestsByKeyword: filteredRequestsByKeyword,
            filteredRequestsByRequestStatus: filteredRequestsByRequestStatus, 
            renderRequestIntoModal: renderRequestIntoModal,
            openModalForNewRequest: openModalForNewRequest,
            isUserAuthenticated: isUserAuthenticated,
            currentPage: currentPage,
            userName: userName,
            password: password,
            loadAdminModule: loadAdminModule,
            loadClientModule: loadClientModule,
            loadBusinessModule: loadBusinessModule,
            loadHelpDeskModule: loadHelpDeskModule,
            admin: admin,
            client: client,
            business: business,
            helpdesk: helpdesk
        };
    });
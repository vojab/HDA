/****** VIEWMODEL SECTION *******/
define('MobileViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy', 'model', 'bootstrap', 'nicEdit', 'toastr'],
    function ($, ko, cookie, dataService, underscore, sammy, model, bootstrap, nicEdit, toastr) {
        var that = this;

        initialize = function () {
            toastr.info('Mobile - Up and running!');
            // Load lookup data
            that.loadProducts();
            that.loadRequestStatusOptions();
        };

        // ----- Knockout Custom Binders Section -----

        ko.bindingHandlers.executeOnEnter = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var allBindings = allBindingsAccessor();
                $(element).keypress(function (event) {
                    var keyCode = (event.which ? event.which : event.keyCode);
                    if (keyCode === 13) {
                        allBindings.executeOnEnter.call(viewModel);
                        return false;
                    }
                    return true;
                });
            }
        };

        // ----- --------------------------- -----

        // ----- Knockout Observable Section -----

        // Knockout Observable for pages handling
        isUserAuthenticated = ko.observable(false);
        currentPage = ko.observable();
        
        helpDeskRequestDetailsPage = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "helpDeskRequestDetails" && that.isUserAuthenticated() === true) {
                //$("#helpDeskRequestDetails").fadeIn();
                return true;
            }
        }, that);
        
        helpDeskRequestGridPage = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "helpDeskRequestGrid" && that.isUserAuthenticated() === true) {
                //$("#requestsArea").fadeIn();
                return true;
            }
        }, that);
        
        productsGridPage = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "productsGrid" && that.isUserAuthenticated() === true) {
                //$("#requestsArea").fadeIn();
                return true;
            }
        }, that);
        
        usersGridPage = ko.computed(function () {
            // TODO: Move hardcoded values to the config
            if (that.currentPage() === "usersGrid" && that.isUserAuthenticated() === true) {
                //$("#requestsArea").fadeIn();
                return true;
            }
        }, that);

        // Knockout Observable for authentication
        loggedInUser = ko.observable(new model.user());
        userName = ko.observable();
        password = ko.observable();
        newPassword = ko.observable();

        // Knockout Observable for Help Desk Requests
        selectedRequest = ko.observable(new model.request());
        newRequest = ko.observable(new model.request());
        requests = ko.observableArray([]);
        filteredRequestsByKeyword = ko.observableArray([]);
        filteredRequestsByRequestStatus = ko.observableArray([]);
        keywordFilter = ko.observable("");
        requestStatusFilter = ko.observable("");
        newUser = ko.observable(new model.user());
        users = ko.observableArray([]);
        selectedUser = ko.observable([]);
        userTypes = ko.observableArray([]);
        selectedUserType = ko.observable([]);
        newProduct = ko.observable(new model.product());
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

        loadUser = function () {
            dataService.user.getUserByUserNameAndPassword({
                success: function (result) {
                    that.bindUserData(result);
                },
                error: function () {
                    toastr.error('Unknown error in loadUser method');
                }
            }, that.userName(), that.password());
        };

        // Function for binding JSON requests data to the knockout observable
        bindUserData = function (result) {
            // TODO: Move hardcoded values to the config
            if (result === 'Wrong Credientials') {
                toastr.error('Wrong Credientials');
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
                switch (userType) {
                    case 1: // ADMIN
                        that.currentPage("ADMIN");
                        that.loadRequests();
                        that.loadUserTypes();
                        that.loadUsers();
                        that.renderUsers();
                        that.renderProducts();
                        toastr.success('ADMIN type of user logged in');
                        break;
                    case 2: // HELP DESK
                        that.currentPage("HELPDESK");
                        that.loadRequests("HELPDESK");
                        that.loadUsers("HELPDESK");
                        toastr.success('HELPDESK type of user logged in');
                        break;
                    case 3: // CLIENT
                        that.currentPage("CLIENT");
                        that.loadRequestsOpenedByClient();
                        toastr.success('CLIENT type of user logged in');
                        break;
                    case 4: // BUSINESS
                        //that.filterRequestStatusOptions();
                        that.currentPage("BUSINESS");
                        that.loadRequests("BUSINESS");
                        toastr.success('BUSINESS type of user logged in');
                        break;
                    default: // UNKNOWN
                        toastr.error('Unknown user type');
                }
                that.currentPage("helpDeskRequestGrid");
            }
        };

        loadUserTypes = function () {
            dataService.usertypes.getUserTypes({
                success: function (result) {
                    that.bindUserTypesData(result);
                },
                error: function () {
                    toastr.error('Unknown error');
                }
            });
        };

        bindUserTypesData = function (result) {
            that.userTypes.removeAll();
            for (var i = 0; i < result.length; i++) {
                var currentUserType = new model.userType(result[i]);
                that.userTypes.push(currentUserType);
            }
        };

        loadUsers = function (filterType) {
            dataService.user.getUsers({
                success: function (result) {
                    that.bindUsersData(result, filterType);
                },
                error: function () {
                    toastr.error('Unknown error');
                }
            });
        };

        bindUsersData = function (result, filterType) {
            that.users.removeAll();
            for (var i = 0; i < result.length; i++) {
                var currentUser = new model.user(result[i]);

                // TODO: Move hardcoded values to the config
                switch (filterType) {
                    // For currently logged in help desk users load only business provider type of users
                    case "HELPDESK":
                        // 4 - BUSINESS - BP type of user - TODO: Move to the config
                        if (currentUser.UserType().UserTypeId() === 4) {
                            that.users.push(currentUser);
                        }
                        break;
                    default:
                        that.users.push(currentUser);
                        break;
                }
            }
        };

        // Apply template to target div and render users data
        renderUsers = function () {
            try {
                var selector = "#usersArea";
                $(selector).attr("data-bind", "template: { name: 'usersListTemplate' }");
            } catch (e) {
                toastr.error('Exception was thrown - Could not render users');
            }
        };

        saveUser = function () {
            dataService.user.saveUser({
                success: function (message) {
                    toastr.success(message);
                    $('#newUserModal').modal('hide');
                    that.loadUsers();
                },
                error: function () {
                    toastr.error('Unknown error');
                }
            }, that.newUser().UserDescription(),
               that.selectedUserType().UserTypeId(),
               that.newUser().Password(),
               that.newUser().UserName());

            that.newUser().Password('');
            that.newUser().UserName('');
            that.newUser().UserDescription('');
        };

        // Apply template to target div to render modal for creating new user
        openModalForNewUser = function () {
            try {
                var selector = "#newUserModalArea";
                $(selector).attr("data-bind", "template: { name: 'newUserModalTemplate' }");
                ko.cleanNode($('#newUserModalArea'));
                ko.applyBindings(that.newRequest, document.getElementById("newUserModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not open modal for the new user');
            }
        };

        deleteUser = function (currentData) {
            dataService.user.deleteUser({
                success: function (message) {
                    that.loadUsers();
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in deleteUser method');
                }
            }, currentData.UserId());
        };

        openChangePasswordModal = function (currentData) {
            try {
                selectedUser(currentData);
                var selector = "#changePasswordModalArea";
                $(selector).attr("data-bind", "template: { name: 'changePasswordModalTemplate', data: selectedUser }");
                ko.cleanNode($('#changePasswordModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("changePasswordModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current user into modal');
            }
        };

        changePassword = function () {
            dataService.user.changePassword({
                success: function (message) {
                    that.loadUsers();
                    $('#changePasswordModal').modal('hide');
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in changePassword method');
                }
            }, that.selectedUser().UserId(), that.newPassword());
        };

        loadProducts = function () {
            dataService.product.getProducts({
                success: function (result) {
                    that.bindProductsData(result);
                },
                error: function () {
                    toastr.error('Unknown error in loadProducts method');
                }
            });
        };

        bindProductsData = function (result) {
            that.products.removeAll();
            for (var i = 0; i < result.length; i++) {
                var currentProduct = new model.product(result[i]);
                that.products.push(currentProduct);
            }
        };

        // Apply template to target div and render products data
        renderProducts = function () {
            try {
                var selector = "#productsArea";
                $(selector).attr("data-bind", "template: { name: 'productsListTemplate' }");
            } catch (e) {
                toastr.error('Unknown error in renderProducts method');
            }
        };

        saveProduct = function () {
            dataService.product.saveProduct({
                success: function (message) {
                    toastr.success(message);
                    $('#newProductModal').modal('hide');
                    that.loadProducts();
                },
                error: function () {
                    toastr.error('Unknown error in saveProduct method');
                }
            }, that.newProduct().ProductName(),
               that.newProduct().ProductDescription());

            that.newProduct().ProductName('');
            that.newProduct().ProductDescription('');
        };

        // Apply template to target div to render modal for creating new product
        openModalForNewProduct = function () {
            try {
                var selector = "#newProductModalArea";
                $(selector).attr("data-bind", "template: { name: 'newProductModalTemplate' }");
                ko.cleanNode($('#newProductModalArea'));
                ko.applyBindings(that.newRequest, document.getElementById("newProductModalArea"));
            } catch (e) {
                toastr.error('Unknown error in openModalForNewProduct method');
            }
        };

        deleteProduct = function (currentData) {
            dataService.product.deleteProduct({
                success: function (message) {
                    toastr.success(message);
                    that.loadProducts();
                },
                error: function () {
                    toastr.error('Unknown error in deleteProduct method');
                }
            }, currentData.ProductId());
        };

        loadRequestStatusOptions = function (filterType) {
            dataService.requestStatus.getRequestStatusOptions({
                success: function (result) {
                    that.bindRequestStatusOptionsData(result, filterType);
                },
                error: function () {
                    toastr.error('Unknown error in loadRequestStatusOptions method');
                }
            });
        };

        bindRequestStatusOptionsData = function (result, filterType) {
            // Add to the top ALL options for all request status
            var allRequestStatusOption = new model.requestStatus();
            allRequestStatusOption.RequestStatusId(0);
            allRequestStatusOption.RequestStatusValue(0);
            allRequestStatusOption.RequestStatusName("ALL");
            that.requestStatusOptions.push(allRequestStatusOption);

            for (var i = 0; i < result.length; i++) {
                var currentRequestStatusOption = new model.requestStatus(result[i]);
                that.requestStatusOptions.push(currentRequestStatusOption);

                // *********** FILTER LOGIC ***********

                //// TODO: Move hardcoded values to the config
                //switch (filterType) {
                //    // For currently logged in business users load only FINISHED request status
                //    case "BUSINESS":
                //        // TODO: Move to the config
                //        if (currentRequestStatusOption.RequestStatusName() === 'FINISHED') {
                //            that.requestStatusOptions.push(currentRequestStatusOption);
                //        }
                //        break;
                //    default:
                //        that.requestStatusOptions.push(currentRequestStatusOption);
                //        break;
                //}

                // ***********************************

            }
            ko.applyBindings(that);
        };

        // Show only FINISHED request status for business users
        filterRequestStatusOptions = function () {

            that.requestStatusOptions(_.filter(that.requestStatusOptions(), function (currentRequestStatusOption) {
                return currentRequestStatusOption.RequestStatusName() === 'FINISHED';
            }));
        };

        loadRequestsOpenedByClient = function () {
            dataService.request.getRequestsOpenedByClientId({
                success: function (result) {
                    that.bindRequestData(result);
                },
                error: function () {
                    toastr.error('Unknown error in loadRequestsOpenedByClient method');
                }
            }, that.loggedInUser().UserId());
        };

        // Filter Type is mode for loading help desk requests by different parameters
        // Specific Request Status, or for specific User ID
        loadRequests = function (filterType) {
            dataService.request.getRequests({
                success: function (result) {
                    that.bindRequestData(result, filterType);
                },
                error: function () {
                    toastr.error('Unknown error in loadRequests method');
                }
            });
        };

        // Function for binding JSON requests data to the knockout observable
        bindRequestData = function (result, filterType) {
            that.requests.removeAll();
            // Empty requests array and fill with new data
            for (var i = 0; i < result.length; i++) {
                var currentRequest = result[i];

                // ------------------------ SETUP OF REQUESTS ----------------------------

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

                // Find first user in assigned user changes with lowest id (that is first user (client) who opened request)
                var firstAssignedUserChangesObject =
                    _.min(currentRequest.AssignedUserChanges, function (assignedUserChangesObject) {
                        return assignedUserChangesObject.AssignedUserChangesId;
                    });
                currentRequest.firstAssignedUser = firstAssignedUserChangesObject.User;

                // -----------------------------------------------------------------------

                var currentRequestObservable = new model.request(currentRequest);

                // TODO: Move hardcoded values to the config
                switch (filterType) {
                    // For currently logged in help desk users load only help desk requests 
                    // 1) assigned to the currently logged in help desk personnel 
                    // 2) and all help desk requests in status OPEN
                    case "HELPDESK":
                        if (currentRequest.currentAssignedUser.UserId === that.loggedInUser().UserId() ||
                            currentRequest.currentRequestStatus.RequestStatusName === "OPEN") {
                            that.requests.push(currentRequestObservable);
                        }
                        break;
                        // For business users load only requests assigned to currently logged in business user
                    case "BUSINESS":
                        if (currentRequest.currentAssignedUser.UserId === that.loggedInUser().UserId()) {
                            that.requests.push(currentRequestObservable);
                        }
                        break;
                    default:
                        that.requests.push(currentRequestObservable);
                        break;
                }
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
                toastr.error('Exception was thrown - Could not render requests');
            }
        };

        saveRequest = function () {
            dataService.request.saveRequest({
                success: function (message) {
                    toastr.success(message);
                    $('#newRequestModal').modal('hide');
                    if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                        that.loadRequestsOpenedByClient();
                    }
                    else {
                        that.loadRequests(that.loggedInUser().UserType().UserTypeName());
                    }
                },
                error: function () {
                    toastr.error('Unknown error in saveRequest method');
                }
            }, that.newRequest().RequestSubject(),
               that.newRequest().RequestDescription(),
               that.selectedProduct().ProductId(),
               that.loggedInUser().UserId());

            that.newRequest().RequestSubject('');
            that.newRequest().RequestDescription('');
        };

        deleteRequest = function (currentData) {
            // Validation
            switch (that.loggedInUser().UserType().UserTypeName()) {
                // TODO: move hardcoded values to the config
                case "CLIENT":
                    if (currentData.CurrentRequestStatus().RequestStatusName() !== 'OPEN') {
                        toastr.warning('You cannot delete request that is processed!');
                        return;
                    }
                    break;
                default:
                    break;
            }

            dataService.request.deleteRequest({
                success: function (message) {
                    toastr.success(message);
                    if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                        that.loadRequestsOpenedByClient();
                    }
                    else {
                        that.loadRequests(that.loggedInUser().UserType().UserTypeName());
                    }
                },
                error: function () {
                    toastr.error('Unknown error in deleteRequest method');
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
                toastr.error('Exception was thrown - Could not render requests status options into modal');
            }
        };

        // Create entry in RequestStatusChanges table with currently selected requestid and requeststatusid
        changeRequestStatus = function () {
            // TODO: Move hardcoded value to the config
            if (selectedRequestStatusOption().RequestStatusName().toLowerCase() !== 'all') {

                // ********** VALIDATION SECTION ***********
                //// Validation - business users can only chose requet status - FINISHED
                //if (that.loggedInUser().UserType().UserTypeName() === 'BUSINESS' &&
                //    selectedRequestStatusOption().RequestStatusName().toLowerCase() !== 'finished') {
                //    toastr.warning('Business users can only chose FINISHED status!');
                //    return;
                //}
                // *****************************************

                dataService.requeststatuschanges.saveRequestStatusChange({
                    success: function (message) {
                        toastr.success(message);

                        $('#changeRequestStatusModal').modal('hide');

                        toastr.success('Request status is changed');

                        if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                            that.loadRequestsOpenedByClient();
                        }
                        else {
                            that.loadRequests(that.loggedInUser().UserType().UserTypeName());
                        }
                    },
                    error: function () {
                        toastr.error('Unknown error in changeRequestStatus method');
                    }
                }, that.selectedRequestStatusOption().RequestStatusId(), that.selectedRequest().RequestId());
            }
            else {
                toastr.warning('Chose one of the valid status!');
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
                toastr.error('Exception was thrown - Could not render current users into modal');
            }
        };

        // Create entry in AssignedUserChanges table with currently selected userid and requestid
        assignToUser = function () {
            if (that.loggedInUser().UserType().UserTypeId() === 2) { // 2 - Help Desk User - HDP TODO: Move to the config
                if (that.selectedRequest().CurrentRequestStatus().RequestStatusName() !== "ACCEPTED") {
                    toastr.warning('You cannot assign request to the business provider if request is not in status ACCEPTED. Please first Take Request!');
                    return;
                }
                // In case help desk user assigned request, change status of request to PROCESSED
                dataService.requeststatuschanges.saveRequestStatusChange({
                    success: function (message) {
                        toastr.success(message);
                    },
                    error: function () {
                        toastr.error('Unknown error in assignToUser method');
                    }
                    // TODO: Move hardcoded value 3 - PROCESSED to the config
                }, 3 /*PROCESSED*/, that.selectedRequest().RequestId());
            }

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in assignToUser method');
                }
            }, that.selectedUser().UserId(), that.selectedRequest().RequestId());

            $('#assignToUserModal').modal('hide');

            if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                that.loadRequestsOpenedByClient();
            }
            else {
                that.loadRequests(that.loggedInUser().UserType().UserTypeName());
            }
        };

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
                toastr.error('Exception was thrown - Could not render assigned users history into modal');
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
                toastr.error('Exception was thrown - Could not render request status history into modal');
            }
        };

        takeRequest = function (currentData) {

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in takeRequest method');
                }
            }, that.loggedInUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in takeRequest method');
                }
                // TODO: Move hardcoded value 2 - ACCEPTED to the config
            }, 2 /*ACCEPTED*/, currentData.RequestId());

            $('#takeRequestModal').modal('hide');

            toastr.success('Requests is taken');

            if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                that.loadRequestsOpenedByClient();
            }
            else {
                that.loadRequests(that.loggedInUser().UserType().UserTypeName());
            }
        };

        openTakeRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#takeRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'takeRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#takeRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("takeRequestModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request into modal');
            }
        };

        closeRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "FINISHED") {
                toastr.warning('Cannot close request that is currently processed, you can close only requests that are only in status FINISHED');
                return;
            }

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in closeRequest method');
                }
            }, that.loggedInUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in closeRequest method');
                }
                // TODO: Move hardcoded value 6 - CLOSED to the config
            }, 6 /*CLOSED*/, currentData.RequestId());

            $('#closeRequestModal').modal('hide');

            toastr.success('Request is closed');

            if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                that.loadRequestsOpenedByClient();
            }
            else {
                that.loadRequests(that.loggedInUser().UserType().UserTypeName());
            }
        };

        openCloseRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#closeRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'closeRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#closeRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("closeRequestModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request into modal');
            }
        };

        reopenRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "FINISHED") {
                toastr.warning('Cannot reopen request that is currently processed, you can reopen only requests that are only in status FINISHED');
                return;
            }

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in reopenRequest method');
                }
            }, that.loggedInUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in reopenRequest method');
                }
                // TODO: Move hardcoded value 1 - OPEN to the config
            }, 1 /*OPEN*/, currentData.RequestId());

            $('#reopenRequestModal').modal('hide');

            toastr.success('Request is reopened');

            if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                that.loadRequestsOpenedByClient();
            }
            else {
                that.loadRequests(that.loggedInUser().UserType().UserTypeName());
            }
        };

        openReopenRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#reopenRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'reopenRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#reopenRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("reopenRequestModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request into modal');
            }
        };

        denyRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "OPEN") {
                toastr.warning('You can deny only opened requests - that are in status OPEN');
                return;
            }

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in denyRequest method');
                }
            }, currentData.FirstAssignedUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in denyRequest method');
                }
                // TODO: Move hardcoded value 5 - DENIED to the config
            }, 5 /*DENIED*/, currentData.RequestId());

            $('#denyRequestModal').modal('hide');

            toastr.success('Request is denied');

            if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                that.loadRequestsOpenedByClient();
            }
            else {
                that.loadRequests(that.loggedInUser().UserType().UserTypeName());
            }
        };

        openDenyRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#denyRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'denyRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#denyRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("denyRequestModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request into modal');
            }
        };

        finishRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "PROCESSED") {
                toastr.warning('Cannot finish request that is not processed, you can finish only requests that are only in status PROCESSED');
                return;
            }

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in finishRequest method');
                }
            }, currentData.FirstAssignedUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    toastr.success(message);
                },
                error: function () {
                    toastr.error('Unknown error in finishRequest method');
                }
                // TODO: Move hardcoded value 4 - FINISHED to the config
            }, 4 /*FINISHED*/, currentData.RequestId());

            $('#finishRequestModal').modal('hide');

            toastr.success('Request is finished');

            if (that.loggedInUser().UserType().UserTypeName() === 'CLIENT') {
                that.loadRequestsOpenedByClient();
            }
            else {
                that.loadRequests(that.loggedInUser().UserType().UserTypeName());
            }
        };

        openFinishRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#finishRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'finishRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#finishRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("finishRequestModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request into modal');
            }
        };

        openRequest = function (currentData) {
            selectedRequest(currentData);
            renderRequestIntoModal();
        };

        // Apply template to target div and render requests data
        renderRequestIntoModal = function () {
            try {
                var selector = "#requestModalArea";
                $(selector).attr("data-bind", "template: { name: 'requestDetailsModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#requestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("requestModalArea"));
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request into modal');
            }
        };

        // Apply template to target div to render modal for creating new request
        openModalForNewRequest = function () {
            try {
                var selector = "#newRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'newRequestModalTemplate' }");
                ko.cleanNode($('#newRequestModalArea'));
                ko.applyBindings(that.newRequest, document.getElementById("newRequestModalArea"));
                //nicEditors.allTextAreas();
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request into modal');
            }
        };

        // Filter requests using the filter text
        that.filteredRequestsByKeyword = ko.computed(function () {
            var keywordFilter = that.keywordFilter().toLowerCase();
            if (!keywordFilter) {
                return that.requests();
            } else {
                return ko.utils.arrayFilter(that.requests(), function (request) {
                    return ko.utils.stringStartsWith(request.RequestSubject().toLowerCase(), keywordFilter);
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

        signOut = function () {
            window.location.reload(false);
        };
        
        // ****************************************
        
        loadHelpDeskRequest = function (currentData) {
            try {
                that.currentPage("helpDeskRequestDetails");
                selectedRequest(currentData);
                var selector = "#helpDeskRequestDetailsArea";
                $(selector).attr("data-bind", "template: { name: 'helpDeskRequestDetailsTemplate', data: selectedRequest }");
                ko.cleanNode($('#helpDeskRequestDetailsArea'));
                //ko.applyBindings(that.selectedRequest, document.getElementById("helpDeskRequestDetails"));
                ko.applyBindings(that);
                // TODO: Find a way to append actions at the bottom
                //$(selector + ">div").append('<div class="row"><div class="col-md-4 text-center"><h4>Details</h4></div><div class="col-md-4 text-center"><h4>Change Password</h4></div><div class="col-md-4 text-center"><h4>Delete</h4></div></div>');
            } catch (e) {
                toastr.error('Exception was thrown - Could not render current request');
            }
        };
        
        loadHelpDeskRequestsGrid = function () {
            try {
                that.currentPage("helpDeskRequestGrid");
                //var selector = "#helpDeskRequestDetailsArea";
                //$(selector).attr("data-bind", "template: { name: 'helpDeskRequestDetailsTemplate', data: selectedRequest }");
                //ko.cleanNode($('#helpDeskRequestDetailsArea'));
                //ko.applyBindings(that);
            } catch (e) {
                toastr.error('Exception was thrown');
            }
        };
        
        loadProductsGrid = function () {
            try {
                that.currentPage("productsGrid");
                var selector = "#productsDetailsArea";
                $(selector).attr("data-bind", "template: { name: 'productsListTemplate' }");
                ko.cleanNode($('#productsDetailsArea'));
                ko.applyBindings(that);
            } catch (e) {
                toastr.error('Exception was thrown');
            }
        };
        
        loadUsersGrid = function () {
            try {
                that.currentPage("usersGrid");
                var selector = "#usersDetailsArea";
                $(selector).attr("data-bind", "template: { name: 'usersListTemplate' }");
                ko.cleanNode($('#usersDetailsArea'));
                ko.applyBindings(that);
            } catch (e) {
                toastr.error('Exception was thrown');
            }
        };

        return {
            initialize: initialize,
            loadRequests: loadRequests,
            openRequest: openRequest,
            takeRequest: takeRequest,
            openTakeRequestModal: openTakeRequestModal,
            closeRequest: closeRequest,
            openCloseRequestModal: openCloseRequestModal,
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
            newUser: newUser,
            deleteUser: deleteUser,
            users: users,
            selectedUser: selectedUser,
            userTypes: userTypes,
            selectedUserType: selectedUserType,
            saveUser: saveUser,
            saveProduct: saveProduct,
            products: products,
            newProduct: newProduct,
            deleteProduct: deleteProduct,
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
            openModalForNewUser: openModalForNewUser,
            openChangePasswordModal: openChangePasswordModal,
            openModalForNewProduct: openModalForNewProduct,
            isUserAuthenticated: isUserAuthenticated,
            currentPage: currentPage,
            userName: userName,
            password: password,
            newPassword: newPassword,
            admin: admin,
            client: client,
            business: business,
            helpdesk: helpdesk,
            signOut: signOut,
            // ****************************************
            loadHelpDeskRequest: loadHelpDeskRequest,
            helpDeskRequestDetailsPage: helpDeskRequestDetailsPage,
            loadHelpDeskRequestsGrid: loadHelpDeskRequestsGrid,
            helpDeskRequestGridPage: helpDeskRequestGridPage,
            loadProductsGrid: loadProductsGrid,
            productsGridPage: productsGridPage,
            loadUsersGrid: loadUsersGrid,
            usersGridPage: usersGridPage
        };
    });
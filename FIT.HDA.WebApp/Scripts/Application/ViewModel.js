/****** VIEWMODEL SECTION *******/
define('ViewModel', ['jquery', 'ko', 'cookie', 'DataService', 'underscore', 'sammy', 'model', 'bootstrap', 'nicEdit'],
    function ($, ko, cookie, dataService, underscore, sammy, model, bootstrap, nicEdit) {
        var that = this;

        initialize = function () {
            // Load lookup data
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

        //loadAdminModule = ko.computed(function () {
        //    // TODO: Move hardcoded values to the config
        //    if (that.currentPage() === "ADMIN" && that.isUserAuthenticated() === true) {
        //        $("#adminModule").fadeIn();
        //        return true;
        //    }
        //}, that);

        //loadClientModule = ko.computed(function () {
        //    // TODO: Move hardcoded values to the config
        //    if (that.currentPage() === "CLIENT" && that.isUserAuthenticated() === true) {
        //        $("#clientModule").fadeIn();
        //        return true;
        //    }
        //}, that);

        //loadBusinessModule = ko.computed(function () {
        //    // TODO: Move hardcoded values to the config
        //    if (that.currentPage() === "BUSINESS" && that.isUserAuthenticated() === true) {
        //        $("#businessModule").fadeIn();
        //        return true;
        //    }
        //}, that);

        //loadHelpDeskModule = ko.computed(function () {
        //    // TODO: Move hardcoded values to the config
        //    if (that.currentPage() === "HELPDESK" && that.isUserAuthenticated() === true) {
        //        $("#helpDeskModule").fadeIn();
        //        return true;
        //    }
        //}, that);

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
        newUser = ko.observable(new model.user());
        users = ko.observableArray([]);
        selectedUser = ko.observable([]);
        userTypes = ko.observableArray([]);
        selectedUserType = ko.observable([]);
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
                switch (userType) {
                    case 1: // ADMIN
                        that.currentPage("ADMIN");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequests();
                        that.loadUserTypes();
                        that.loadUsers();
                        that.renderUsers();
                        that.renderProducts();
                        break;
                    case 2: // HELP DESK
                        that.currentPage("HELPDESK");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequests("HELPDESK");
                        that.loadUsers("HELPDESK");
                        break;
                    case 3: // CLIENT
                        that.currentPage("CLIENT");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequestsOpenedByClient();
                        break;
                    case 4: // BUSINESS
                        that.currentPage("BUSINESS");
                        // TODO: Customize loading of requests for specific type of user
                        that.loadRequests("BUSINESS");
                        break;
                    default: // UNKNOWN
                        alert('Unknown user type');
                }
            }

            //that.renderRequests();
            //ko.applyBindings(that);
        };

        loadUserTypes = function () {
            dataService.usertypes.getUserTypes({
                success: function (result) {
                    that.bindUserTypesData(result);
                    //console.log(result);
                },
                error: function () {
                    console.log('error !');
                }
            });
        };

        bindUserTypesData = function (result) {
            for (var i = 0; i < result.length; i++) {
                var currentUserType = new model.userType(result[i]);
                that.userTypes.push(currentUserType);
            }
        };

        loadUsers = function (filterType) {
            dataService.user.getUsers({
                success: function (result) {
                    that.bindUsersData(result, filterType);
                    //console.log(result);
                },
                error: function () {
                    console.log('error !');
                }
            });
        };

        bindUsersData = function (result, filterType) {
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
                console.log('Exception was thrown - Could not render users');
                //that.redirectToErrorPage();
            }
        };

        saveUser = function () {
            alert('save user');
            dataService.user.saveUser({
                success: function (message) {
                    //TODO: toaster message here
                    console.log(message);
                    $('#newUserModal').modal('hide');
                    that.users(ko.observableArray([]));
                    that.loadUsers();
                },
                error: function () {
                    console.log('error !');
                }
            }, that.newUser().UserDescription(),
               that.selectedUserType().UserTypeId(),
               that.newUser().Password(),
               that.newUser().UserName());
        };
        
        // Apply template to target div to render modal for creating new user
        openModalForNewUser = function () {
            try {
                var selector = "#newUserModalArea";
                $(selector).attr("data-bind", "template: { name: 'newUserModalTemplate' }");
                //$('#newRequestModal').modal('show');
                ko.cleanNode($('#newUserModalArea'));
                ko.applyBindings(that.newRequest, document.getElementById("newUserModalArea"));
                nicEditors.allTextAreas();
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();
            }
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

        // Apply template to target div and render products data
        renderProducts = function () {
            try {
                var selector = "#productsArea";
                $(selector).attr("data-bind", "template: { name: 'productsListTemplate' }");
            } catch (e) {
                console.log('Exception was thrown - Could not render users');
                //that.redirectToErrorPage();
            }
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

        loadRequestsOpenedByClient = function () {
            dataService.request.getRequestsOpenedByClientId({
                success: function (result) {
                    //alert(result);
                    that.bindRequestData(result);
                },
                error: function () {
                    alert('Error');
                }
            }, that.loggedInUser().UserId());
        };

        // Filter Type is mode for loading help desk requests by different parameters
        // Specific Request Status, or for specific User ID
        loadRequests = function (filterType) {
            dataService.request.getRequests({
                success: function (result) {
                    //alert(result);
                    that.bindRequestData(result, filterType);
                },
                error: function () {
                    alert('Error');
                }
            });
        };

        // Function for binding JSON requests data to the knockout observable
        bindRequestData = function (result, filterType) {
            // Empty requests array and fill with new data
            //that.requests(ko.observableArray([]));
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
            // Validation
            switch (that.loggedInUser().UserType().UserTypeName()) {
                // TODO: moveBy hardcoded values to the config
                case "CLIENT":
                    if (currentData.CurrentRequestStatus().RequestStatusName() !== 'OPEN') {
                        // TODO: Implement toaster message here
                        alert('You cannot delete request that is processed!');
                        return;
                    }
                    break;
                default:
                    break;
            }

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
        assignToUser = function () {

            if (that.loggedInUser().UserType().UserTypeId() === 2) { // 2 - Help Desk User - HDP TODO: Move to the config
                if (that.selectedRequest().CurrentRequestStatus().RequestStatusName() !== "ACCEPTED") {
                    // TODO: Add toaster message here
                    alert('You cannot assign request to the business provider if request is not in status ACCEPTED. Please first Take Request!');
                    return;
                }
                // In case help desk user assigned request, change status of request to PROCESSED
                dataService.requeststatuschanges.saveRequestStatusChange({
                    success: function (message) {
                        console.log(message);
                    },
                    error: function () {
                        console.log('error !');
                    }
                    // TODO: Move hardcoded value 3 - PROCESSED to the config
                }, 3 /*PROCESSED*/, that.selectedRequest().RequestId());
            }

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
            // TODO: Replace alert with toaster message
            alert('Request TAKEN!!!');

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, that.loggedInUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
                // TODO: Move hardcoded value 2 - ACCEPTED to the config
            }, 2 /*ACCEPTED*/, currentData.RequestId());
        };

        openTakeRequestModal = function (currentData) {
            try {
                //alert('Take request');
                selectedRequest(currentData);
                var selector = "#takeRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'takeRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#takeRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("takeRequestModalArea"));
                //$('#takeRequestModalArea').modal('show');
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();`
            }
        };

        closeRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "FINISHED") {
                alert('Cannot close request that is currently processed, you can close only requests that are only in status FINISHED');
                return;
            }

            // TODO: Replace alert with toaster message
            alert('Request CLOSED!!!');

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, that.loggedInUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
                // TODO: Move hardcoded value 6 - CLOSED to the config
            }, 6 /*CLOSED*/, currentData.RequestId());
        };

        openCloseRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#closeRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'closeRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#closeRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("closeRequestModalArea"));
                //$('#closeRequestModalArea').modal('show');
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();`
            }
        };

        reopenRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "FINISHED") {
                alert('Cannot reopen request that is currently processed, you can reopen only requests that are only in status FINISHED');
                return;
            }

            // TODO: Replace alert with toaster message
            alert('Request REOPENED!!!');

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, that.loggedInUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
                // TODO: Move hardcoded value 1 - OPEN to the config
            }, 1 /*OPEN*/, currentData.RequestId());
        };

        openReopenRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#reopenRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'reopenRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#reopenRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("reopenRequestModalArea"));
                //$('#closeRequestModalArea').modal('show');
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();`
            }
        };

        denyRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "ACCEPTED") {
                alert('Cannot deny request that is not accepted, you can deny only requests that are only in status ACCEPTED');
                return;
            }

            // TODO: Replace alert with toaster message
            alert('Request DENIED!!!');

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, currentData.FirstAssignedUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
                // TODO: Move hardcoded value 5 - DENIED to the config
            }, 5 /*DENIED*/, currentData.RequestId());
        };

        openDenyRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#denyRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'denyRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#denyRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("denyRequestModalArea"));
                //$('#closeRequestModalArea').modal('show');
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();`
            }
        };

        finishRequest = function (currentData) {
            // Validation
            // TODO: Move hardcoded value to the config
            if (currentData.CurrentRequestStatus().RequestStatusName() !== "PROCESSED") {
                alert('Cannot finish request that is not processed, you can finish only requests that are only in status PROCESSED');
                return;
            }

            // TODO: Replace alert with toaster message
            alert('Request FINISHED!!!');

            dataService.assigneduserchanges.saveAssignedUserChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
            }, currentData.FirstAssignedUser().UserId(), currentData.RequestId());

            dataService.requeststatuschanges.saveRequestStatusChange({
                success: function (message) {
                    console.log(message);
                },
                error: function () {
                    console.log('error !');
                }
                // TODO: Move hardcoded value 4 - FINISHED to the config
            }, 4 /*FINISHED*/, currentData.RequestId());
        };

        openFinishRequestModal = function (currentData) {
            try {
                selectedRequest(currentData);
                var selector = "#finishRequestModalArea";
                $(selector).attr("data-bind", "template: { name: 'finishRequestModalTemplate', data: selectedRequest }");
                ko.cleanNode($('#finishRequestModalArea'));
                ko.applyBindings(that.selectedRequest, document.getElementById("finishRequestModalArea"));
                //$('#closeRequestModalArea').modal('show');
            } catch (e) {
                console.log('Exception was thrown - Could not render current request into modal');
                //that.redirectToErrorPage();`
            }
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
            users: users,
            selectedUser: selectedUser,
            userTypes: userTypes,
            selectedUserType: selectedUserType,
            saveUser: saveUser,
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
            openModalForNewUser: openModalForNewUser,
            isUserAuthenticated: isUserAuthenticated,
            currentPage: currentPage,
            userName: userName,
            password: password,
            //loadAdminModule: loadAdminModule,
            //loadClientModule: loadClientModule,
            //loadBusinessModule: loadBusinessModule,
            //loadHelpDeskModule: loadHelpDeskModule,
            admin: admin,
            client: client,
            business: business,
            helpdesk: helpdesk
        };
    });
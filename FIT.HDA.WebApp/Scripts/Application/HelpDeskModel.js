define('model', [], function () {
    var request = function (object) {
        var self = this;
        object = object || {};
        self.RequestId = ko.observable(object.RequestId);
        self.RequestSubject = ko.observable(object.RequestSubject);
        self.RequestDescription = ko.observable(object.RequestDescription);
        self.RequestReadyForArchive = ko.observable(object.RequestReadyForArchive);
        self.Estimated = ko.observable(object.Estimated);
        self.Logged = ko.observable(object.Logged);
        self.RequestOpenDate = ko.observable(object.RequestOpenDate);
        self.RequestClosedDate = ko.observable(object.RequestClosedDate);
        self.DateCreated = ko.observable(object.DateCreated);
        
        self.ProductId = ko.observable(object.ProductId);
        self.Product = ko.observable(new product(object.Product));
        
        self.RequestStatusChanges = ko.observableArray(
            ko.utils.arrayMap(object.RequestStatusChanges, function (requestStatusChangesObject) {
                return new requestStatusChanges(requestStatusChangesObject);
            }));
    
        self.AssignedUserChanges = ko.observableArray(
            ko.utils.arrayMap(object.AssignedUserChanges, function (assignedUserChangesObject) {
                return new assignedUserChanges(assignedUserChangesObject);
            }));

        self.CurrentRequestStatus = ko.observable(new requestStatus(object.currentRequestStatus));
        self.CurrentAssignedUser = ko.observable(new user(object.currentAssignedUser));
        self.FirstAssignedUser = ko.observable(new user(object.firstAssignedUser));
    };

    var product = function (object) {
        var self = this;
        object = object || {};
        self.ProductId = ko.observable(object.ProductId);
        self.ProductName = ko.observable(object.ProductName);
        self.ProductDescription = ko.observable(object.ProductDescription);
        self.DateCreated = ko.observable(object.DateCreated);
    };
    
    var requestStatusChanges = function (object) {
        var self = this;
        object = object || {};
        self.RequestStatusChangesId = ko.observable(object.RequestStatusChangesId);
        self.RequestId = ko.observable(object.RequestId);
        self.DateCreated = ko.observable(object.DateCreated);
        
        self.RequestStatusId = ko.observable(object.RequestStatusId);
        self.RequestStatus = ko.observable(new requestStatus(object.RequestStatus));
    };
    
    var requestStatus = function (object) {
        var self = this;
        object = object || {};
        self.RequestStatusId = ko.observable(object.RequestStatusId);
        self.RequestStatusValue = ko.observable(object.RequestStatusValue);
        self.RequestStatusName = ko.observable(object.RequestStatusName);
        self.DateCreated = ko.observable(object.DateCreated);
    };
    
    var assignedUserChanges = function (object) {
        var self = this;
        object = object || {};
        self.AssignedUserChangesId = ko.observable(object.AssignedUserChangesId);
        self.RequestId = ko.observable(object.RequestId);
        self.DateCreated = ko.observable(object.DateCreated);

        self.UserId = ko.observable(object.UserId);
        self.User = ko.observable(new user(object.User));
    };
    
    var user = function (object) {
        var self = this;
        object = object || {};
        self.UserId = ko.observable(object.UserId);
        self.UserName = ko.observable(object.UserName);
        self.Password = ko.observable(object.Password);
        self.UserDescription = ko.observable(object.UserDescription);
        self.DateCreated = ko.observable(object.DateCreated);
        
        self.UserTypeId = ko.observable(object.UserTypeId);
        self.UserType = ko.observable(new userType(object.UserType));
    };
    
    var userType = function (object) {
        var self = this;
        object = object || {};
        self.UserTypeId = ko.observable(object.UserTypeId);
        self.UserTypeName = ko.observable(object.UserTypeName);
        self.UserTypeDescription = ko.observable(object.UserTypeDescription);
        self.DateCreated = ko.observable(object.DateCreated);
    };

    return {
        request: request,
        requestStatus: requestStatus,
        requestStatusChanges: requestStatusChanges,
        assignedUserChanges: assignedUserChanges,
        user: user,
        userType: userType,
        product: product
    };
});
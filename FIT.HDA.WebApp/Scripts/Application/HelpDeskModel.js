define('model', [], function () {
    var request = function (object) {
        var self = this;
        object = object || {};
        self.RequestId = ko.observable(object.RequestId);
        self.RequestDescription = ko.observable(object.RequestDescription);
        self.RequestReadyForArchive = ko.observable(object.RequestReadyForArchive);
        self.RequestOpenDate = ko.observable(object.RequestOpenDate);
        self.RequestClosedDate = ko.observable(object.RequestClosedDate);
        self.DateCreated = ko.observable(object.DateCreated);
        self.ProductId = ko.observable(object.ProductId);
        self.Product = ko.observable(new product(object.Product));
    };

    var product = function (object) {
        var self = this;
        object = object || {};
        self.ProductId = ko.observable(object.ProductId);
        self.ProductName = ko.observable(object.ProductName);
        self.ProductDescription = ko.observable(object.ProductDescription);
        self.DateCreated = ko.observable(object.DateCreated);
    };

    return {
        request: request,
        product: product
    };
});
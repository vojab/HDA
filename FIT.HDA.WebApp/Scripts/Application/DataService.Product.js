define('DataService.Product',
    ['amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('GetProducts', 'ajax', {
                // TODO: Move base url to the config file
                url: 'http://localhost:3894/api/ProductAPI',
                dataType: 'jsonp',
                type: 'GET'
            });
        },

        getProducts = function (callbacks) {
            return amplify.request({
                resourceId: 'GetProducts',
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getProducts: getProducts
        };
    });
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
            
            amplify.request.define('SaveProduct', 'ajax', {
                url: 'http://localhost:3894/api/ProductAPI/save?productname={productname}&productdescription={productdescription}',
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
        
        saveProduct = function (callbacks, productname, productdescription) {
            return amplify.request({
                resourceId: 'SaveProduct',
                data: {
                    productname: productname,
                    productdescription: productdescription
                },
                success: callbacks.success,
                error: callbacks.error
            });
        };

        init();

        return {
            getProducts: getProducts,
            saveProduct: saveProduct
        };
    });
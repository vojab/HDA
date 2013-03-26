define('Bootstrapper',
['jquery', 'routes', 'viewmodel'],
function ($, routes, viewmodel) {
    var
        run = function () {
            //routes.register();
            viewmodel.initialize();
        };

    return {
        run: run
    };
});
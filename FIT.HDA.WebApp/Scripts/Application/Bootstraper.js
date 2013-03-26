define('Bootstrapper',
['jquery', 'ViewModel'],
function ($, viewmodel) {
    var
        run = function () {
            //routes.register();
            viewmodel.initialize();
        };

    return {
        run: run
    };
});
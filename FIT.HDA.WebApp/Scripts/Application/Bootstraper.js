define('Bootstrapper',
['jquery', 'ViewModel', 'MobileViewModel'],
function ($, viewmodel, mobileviewmodel) {
    var
        run = function () {
            //routes.register();

            // Switch global TargetDevice variable under HDA namespace
            switch (HDA.TargetDevice) {
                case "DESKTOP":
                    viewmodel.initialize();
                    break;
                case "MOBILE":
                    mobileviewmodel.initialize();
                    break;
                default: // UNKNOWN
                    toastr.error('Unknown target device');
            }
        };

    return {
        run: run
    };
});
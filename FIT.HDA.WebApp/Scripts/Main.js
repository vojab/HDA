(function () {
    var main = this;

    defineExternalModules();
    boot();

    function defineExternalModules() {
        // These are already loaded via bundles. 
        // We define them and put them in the root object.
        define('jquery', [], function () { return main.jQuery; });
        define('ko', [], function () { return main.ko; });
        define('amplify', [], function () { return main.amplify; });
        define('moment', [], function () { return main.moment; });
        define('sammy', [], function () { return main.Sammy; });
        define('toastr', [], function () { return main.toastr; });
        define('underscore', [], function () { return main._; });
        define('cookie', [], function () { return main.cookie; });
        define('model', [], function () { return main.model; });
        define('bootstrap', [], function () { return main.bootstrap; });
        define('nicEdit', [], function () { return main.nicEdit; });
    }

    function boot() {
        require(['Bootstrapper'], function (bs) { bs.run(); });
    }

})();
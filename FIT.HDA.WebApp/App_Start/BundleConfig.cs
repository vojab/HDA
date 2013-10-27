using System.Web.Optimization;

namespace HDA.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/Libraries/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jquery.mobile").Include(
            //            "~/Scripts/Libraries/jquery.mobile-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/Libraries/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/Libraries/jquery.unobtrusive*",
                        "~/Scripts/Libraries/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/Libraries/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                                                                 "~/Content/bootstrap.css",
                                                                 //"~/Content/jquery.mobile-1.3.2.css",
                                                                 "~/Content/toastr.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            // All application JS files (except mocks)
            bundles.Add(new ScriptBundle("~/bundles/javaScriptApplicationLibraries")
                .IncludeDirectory("~/Scripts/Application/", "*.js", searchSubdirectories: false));
            // External Party JavaScript files
            bundles.Add(new ScriptBundle("~/bundles/javaScriptExternalLibraries").Include(
                // Knockout and its plugins
                    "~/Scripts/Libraries/knockout-2.1.0.debug.js",
                    "~/Scripts/Libraries/knockout-mapping.js",
                // Other external libraries
                    "~/Scripts/Libraries/underscore.js",
                    "~/Scripts/Libraries/moment.js",
                    "~/Scripts/Libraries/sammy-0.7.1.js",
                    "~/Scripts/Libraries/amplify.js",
                    "~/Scripts/Libraries/toastr.js",
                    "~/Scripts/Libraries/cookie.js",
                    "~/Scripts/Libraries/bootstrap.js",
                    "~/Scripts/Libraries/require.js",
                    "~/Scripts/Libraries/nicEdit.js",
                    "~/Scripts/Libraries/toastr.js"
                    ));
        }
    }
}
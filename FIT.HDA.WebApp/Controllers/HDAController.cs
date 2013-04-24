using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FIT.HDA.WebApp.Controllers
{
    public class HDAController : Controller
    {
        //
        // GET: /Hda/

        //public ActionResult Index()
        //{
        //    return View();
        //}

        [HttpGet]
        public ActionResult Requests()
        {
            ViewBag.Message = "Welcome to the help desk requests page.";

            return View();
        }

    }
}

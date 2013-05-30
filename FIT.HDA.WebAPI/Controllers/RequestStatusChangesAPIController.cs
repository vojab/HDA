using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using FIT.HDA.API.Formatters;
using FIT.HDA.DAL;
using FIT.HDA.DAL.Repositories;
using FIT.HDA.Models;

namespace FIT.HDA.API.Controllers
{
    public class RequestStatusChangesAPIController : ApiController
    {
        private readonly RequestStatusChangesRepository _requestStatusChangesRepository;

        public RequestStatusChangesAPIController()
        {
            _requestStatusChangesRepository = new RequestStatusChangesRepository();
        }

        [System.Web.Http.ActionName("SaveRequestStatusChange")]
        [System.Web.Http.HttpGet]
        public string SaveRequestStatusChange(string requeststatusid, string requestid)
        {
            var requestStatusChange = new RequestStatusChanges();

            requestStatusChange.RequestStatusId = Int32.Parse(requeststatusid);
            requestStatusChange.RequestId = Int32.Parse(requestid);
            requestStatusChange.DateCreated = DateTime.Now;

            _requestStatusChangesRepository.SaveRequestStatusChanges(requestStatusChange);

            // TODO: Handle response
            return "ta-ra";
        }
    }
}

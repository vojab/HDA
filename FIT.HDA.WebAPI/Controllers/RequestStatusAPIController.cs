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
    public class RequestStatusAPIController : ApiController
    {
        private readonly RequestStatusRepository _requestStatusRepository;

        public RequestStatusAPIController()
        {
            _requestStatusRepository = new RequestStatusRepository();
        }

        public IEnumerable<RequestStatus> GetRequestStatus()
        {
            IEnumerable<RequestStatus> requestStatus;

            try
            {
                requestStatus = _requestStatusRepository.GetAll();

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return requestStatus;
        }
    }
}

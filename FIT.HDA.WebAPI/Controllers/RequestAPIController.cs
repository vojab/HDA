using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using FIT.HDA.API.Formatters;
using FIT.HDA.DAL.Repositories;
using FIT.HDA.Models;

namespace FIT.HDA.API.Controllers
{
    public class RequestAPIController : ApiController
    {
        private readonly RequestRepository _requestRepository;

        public RequestAPIController()
        {
            _requestRepository = new RequestRepository();
        }

        public IEnumerable<Request> GetRequests()
        {
            IEnumerable<Request> requests;

            try
            {
                requests = _requestRepository.GetAll();
                
            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return requests;
        }

        //// GET api/requestapi
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/requestapi/5
        public string Get(int id)
        {
            return "value";
        }

        [System.Web.Http.ActionName("save")]
        [System.Web.Http.HttpGet]
        public string SaveRequest(string requestdescription, string productid, string userid)
        {
            var request = new Request();

            request.RequestDescription = requestdescription;
            request.ProductId = Int32.Parse(productid);
            request.RequestReadyForArchive = false;
            request.RequestOpenDate = DateTime.Now;
            request.RequestClosedDate = DateTime.Now;
            request.DateCreated = DateTime.Now;

            // Save Request Status Changes entry
            request.RequestStatusChanges = new Collection<RequestStatusChanges>();
            var requestStatusChange = new RequestStatusChanges();
            requestStatusChange.RequestStatusId = 1; // OPEN
            requestStatusChange.DateCreated = DateTime.Now;
            request.RequestStatusChanges.Add(requestStatusChange);

            // Save Assigned User Changes entry
            request.AssignedUserChanges = new Collection<AssignedUserChanges>();
            var assigneUserChange = new AssignedUserChanges();
            // TODO: Be defensive here, cannot cast any string!
            assigneUserChange.UserId = Int32.Parse(userid);
            assigneUserChange.DateCreated = DateTime.Now;
            request.AssignedUserChanges.Add(assigneUserChange);

            _requestRepository.SaveRequest(request);

            return "ta-ra";
        }

        //// POST api/requestapi
        //[HttpPost]
        //public void Post([FromBody]string value)
        ////public void Post(string value)
        //{
        //    //var request = new Request
        //    //                  {
        //    //                      RequestDescription = "TEST",
        //    //                      RequestOpenDate = DateTime.Now,
        //    //                      RequestClosedDate = DateTime.Now,
        //    //                      DateCreated = DateTime.Now,
        //    //                      RequestReadyForArchive = false,
        //    //                      ProductId = 1
        //    //                  };



        //    var request = new Request();


        //    _requestRepository.SaveRequest(request);
        //}

        // PUT api/requestapi/5
        [System.Web.Http.HttpPut]
        public void Put(int id, [FromBody]string value)
        {
            _requestRepository.UpdateRequest(id);
        }

        // DELETE api/requestapi/5
        [System.Web.Http.HttpDelete]
        public void Delete(int id)
        {
            _requestRepository.DeleteRequest(id);
        }
    }
}

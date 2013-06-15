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
using FIT.HDA.BL.Enums;

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

        [System.Web.Http.ActionName("GetRequestsByUserId")]
        [System.Web.Http.HttpGet]
        public IEnumerable<Request> GetRequestsByUserId(string userid)
        {
            IEnumerable<Request> requests;

            try
            {
                // TODO: Be defensive here - try parse int first
                requests = _requestRepository.GetRequestsByUserId(Int32.Parse(userid));
            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return requests;
        }

        [System.Web.Http.ActionName("GetRequestsByRequestStatusId")]
        [System.Web.Http.HttpGet]
        public IEnumerable<Request> GetRequestsByRequestStatusId(string requeststatusid)
        {
            IEnumerable<Request> requests;

            try
            {
                // TODO: Be defensive here - try parse int first
                requests = _requestRepository.GetRequestsByRequestStatusId(Int32.Parse(requeststatusid));
            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return requests;
        }

        //[System.Web.Http.ActionName("GetRequestsForHelpDeskUsers")]
        //[System.Web.Http.HttpGet]
        //public IEnumerable<Request> GetRequestsForHelpDeskUsers(string userid)
        //{
        //    IEnumerable<Request> requests;

        //    try
        //    {
        //        // TODO: Be defensive here - try parse int first
        //        requests = _requestRepository.GetRequestsForHelpDeskUsers(Int32.Parse(userid));
        //    }
        //    catch (Exception)
        //    {
        //        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        //    }

        //    return requests;
        //}

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
        public string SaveRequest(string requestsubject, 
                                  string requestdescription, 
                                  string productid, 
                                  string userid)
        {
            try
            {
                var request = new Request();

                request.RequestSubject = requestsubject;
                request.RequestDescription = requestdescription;
                request.ProductId = Int32.Parse(productid);
                request.RequestReadyForArchive = false;
                request.RequestOpenDate = DateTime.Now;
                request.RequestClosedDate = DateTime.Now;
                request.DateCreated = DateTime.Now;

                // Save Request Status Changes entry
                request.RequestStatusChanges = new Collection<RequestStatusChanges>();
                var requestStatusChange = new RequestStatusChanges();
                requestStatusChange.RequestStatusId = (int)HelpDeskEnums.RequestStatus.Open;
                requestStatusChange.DateCreated = DateTime.Now;
                request.RequestStatusChanges.Add(requestStatusChange);

                // Save Assigned User Changes entry
                request.AssignedUserChanges = new Collection<AssignedUserChanges>();
                var assignedUserChange = new AssignedUserChanges();
                // TODO: Be defensive here, cannot cast any string!
                assignedUserChange.UserId = Int32.Parse(userid);
                assignedUserChange.DateCreated = DateTime.Now;
                request.AssignedUserChanges.Add(assignedUserChange);

                _requestRepository.SaveRequest(request);

                return "success";
            }
            catch (Exception e)
            {
                return "error";
            }
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

        //// PUT api/requestapi/5
        //[System.Web.Http.HttpPut]
        //public void Put(int id, [FromBody]string value)
        //{
        //    _requestRepository.UpdateRequest(id);
        //}

        [System.Web.Http.ActionName("DeleteRequest")]
        [System.Web.Http.HttpGet]
        public string DeleteRequest(string requestid)
        {
            try
            {
                // TODO: Be defensive here - cannot parse string to int!
                _requestRepository.DeleteRequest(Int32.Parse(requestid));

                return "deleted";
            }
            catch (Exception e)
            {
                return "error";
            }
        }

        //// DELETE api/requestapi/5
        //[System.Web.Http.HttpDelete]
        //public void Delete(int id)
        //{
        //    _requestRepository.DeleteRequest(id);
        //}
    }
}

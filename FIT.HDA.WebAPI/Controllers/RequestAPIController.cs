using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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

        // POST api/requestapi
        [ActionName("save")]
        [HttpGet]
        public string SaveRequest(string requestdescription, string productid)
        {
            var request = new Request();

            request.RequestDescription = requestdescription;
            request.ProductId = Int32.Parse(productid);
            request.RequestReadyForArchive = false;
            request.RequestOpenDate = DateTime.Now;
            request.RequestClosedDate = DateTime.Now;
            request.DateCreated = DateTime.Now;

            _requestRepository.SaveRequest(request);

            return "value";
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
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
            _requestRepository.UpdateRequest(id);
        }

        // DELETE api/requestapi/5
        [HttpDelete]
        public void Delete(int id)
        {
            _requestRepository.DeleteRequest(id);
        }
    }
}

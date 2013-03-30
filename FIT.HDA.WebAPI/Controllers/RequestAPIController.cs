﻿using System;
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
        private readonly RequestRepository requestRepository;

        public RequestAPIController()
        {
            requestRepository = new RequestRepository();

        }

        public IEnumerable<Request> GetRequests()
        {
            IEnumerable<Request> requests;

            try
            {
                requests = requestRepository.GetAll();
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
        public void Post([FromBody]string value)
        {
        }

        // PUT api/requestapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/requestapi/5
        public void Delete(int id)
        {
        }
    }
}

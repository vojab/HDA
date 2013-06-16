using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using FIT.HDA.Models;
using FIT.HDA.DAL.Repositories;

namespace FIT.HDA.API.Controllers
{
    public class UserTypeAPIController : ApiController
    {
        //
        // GET: /UserTypeAPI/

        private readonly UserTypeRepository _userTypeRepository;

        public UserTypeAPIController()
        {
            _userTypeRepository = new UserTypeRepository();
        }

        public IEnumerable<UserType> GetUserTypes()
        {
            IEnumerable<UserType> userTypes;

            try
            {
                userTypes = _userTypeRepository.GetAll();

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return userTypes;
        }

    }
}

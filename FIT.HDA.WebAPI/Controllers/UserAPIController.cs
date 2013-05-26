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
    public class UserAPIController : ApiController
    {
        private readonly UserRepository _userRepository;

        public UserAPIController()
        {
            _userRepository = new UserRepository();
        }

        [System.Web.Http.ActionName("getUserByUserNameAndPassword")]
        public User GetUserByUserNameAndPassword(string username, string password)
        {
            var user = new User();

            try
            {
                user = _userRepository.GetUserByUserNameAndPassword(username, password);

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return user;
        }
    }
}

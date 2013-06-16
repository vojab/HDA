using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using FIT.HDA.API.Formatters;
using FIT.HDA.BL.Enums;
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

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users;

            try
            {
                users = _userRepository.GetAll();

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return users;
        }

        [System.Web.Http.ActionName("GetUserByUserNameAndPassword")]
        [System.Web.Http.HttpGet]
        public string GetUserByUserNameAndPassword(string username, string password)
        {
            var user = new User();

            try
            {
                user = _userRepository.GetUserByUserNameAndPassword(username, password);
                if (user != null)
                {
                    return Newtonsoft.Json.JsonConvert.SerializeObject(user);
                } else
                {
                    return "badcredientials";
                }

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }           
        }

        [System.Web.Http.ActionName("save")]
        [System.Web.Http.HttpGet]
        public string SaveRequest(string userdescription,
                                  string usertypeid,
                                  string password,
                                  string username)
        {
            try
            {
                var user = new User();

                user.UserName = username;
                user.Password = password;
                user.UserDescription = userdescription;
                // TODO: Be defensive here - parse to int problem?
                user.UserTypeId = Int32.Parse(usertypeid);
                user.DateCreated = DateTime.Now;

                _userRepository.SaveUser(user);

                return "success";
            }
            catch (Exception e)
            {
                return "error";
            }
        }
    }
}
